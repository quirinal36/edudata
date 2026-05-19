#!/usr/bin/env python3
"""NEIS 학원·교습소 API에서 17개 시·도 교육청의 '컴퓨터/코딩' 관련 학원을 수집해 CSV로 저장한다."""
import csv
import json
import sys
import time
import urllib.parse
import urllib.request

API_KEY = "4d5d66b7284e425c95ec45051ff509ca"
BASE_URL = "https://open.neis.go.kr/hub/acaInsTiInfo"
PAGE_SIZE = 1000

OFFICES = [
    ("B10", "서울특별시교육청"),
    ("C10", "부산광역시교육청"),
    ("D10", "대구광역시교육청"),
    ("E10", "인천광역시교육청"),
    ("F10", "광주광역시교육청"),
    ("G10", "대전광역시교육청"),
    ("H10", "울산광역시교육청"),
    ("I10", "세종특별자치시교육청"),
    ("J10", "경기도교육청"),
    ("K10", "강원특별자치도교육청"),
    ("M10", "충청북도교육청"),
    ("N10", "충청남도교육청"),
    ("P10", "전북특별자치도교육청"),
    ("Q10", "전라남도교육청"),
    ("R10", "경상북도교육청"),
    ("S10", "경상남도교육청"),
    ("T10", "제주특별자치도교육청"),
]

KEYWORDS = ["컴퓨터", "코딩"]

FIELDS = [
    "ATPT_OFCDC_SC_CODE", "ATPT_OFCDC_SC_NM", "ADMST_ZONE_NM",
    "ACA_INSTI_SC_NM", "ACA_ASNUM", "ACA_NM",
    "ESTBL_YMD", "REG_YMD", "REG_STTUS_NM",
    "CAA_BEGIN_YMD", "CAA_END_YMD",
    "TOFOR_SMTOT", "DTM_RCPTN_ABLTY_NMPR_SMTOT",
    "REALM_SC_NM", "LE_ORD_NM", "LE_CRSE_LIST_NM", "LE_CRSE_NM",
    "PSNBY_THCC_CNTNT", "THCC_OTHBC_YN", "BRHS_ACA_YN",
    "FA_RDNMA", "FA_RDNDA", "FA_RDNZC", "FA_TELNO",
    "LOAD_DTM",
]


def fetch_page(code: str, page: int) -> tuple[list[dict], int]:
    params = {
        "KEY": API_KEY,
        "Type": "json",
        "pIndex": page,
        "pSize": PAGE_SIZE,
        "ATPT_OFCDC_SC_CODE": code,
    }
    url = f"{BASE_URL}?{urllib.parse.urlencode(params)}"
    for attempt in range(5):
        try:
            with urllib.request.urlopen(url, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            break
        except Exception as exc:
            wait = 2 ** attempt
            print(f"    [retry {attempt+1}] {exc}; wait {wait}s", flush=True)
            time.sleep(wait)
    else:
        raise RuntimeError(f"failed to fetch {code} p{page}")

    if "acaInsTiInfo" not in data:
        result = data.get("RESULT", {})
        if result.get("CODE") == "INFO-200":
            return [], 0
        raise RuntimeError(f"unexpected response for {code} p{page}: {data}")

    head = data["acaInsTiInfo"][0]["head"]
    total = head[0].get("list_total_count", 0)
    rows = data["acaInsTiInfo"][1].get("row", [])
    return rows, total


def matches(row: dict) -> bool:
    haystack = " ".join(
        (row.get(k) or "")
        for k in ("ACA_NM", "LE_CRSE_LIST_NM", "LE_CRSE_NM", "REALM_SC_NM", "LE_ORD_NM")
    )
    return any(kw in haystack for kw in KEYWORDS)


def main(out_path: str) -> None:
    matched: list[dict] = []
    summary: list[tuple[str, str, int, int]] = []

    for code, name in OFFICES:
        print(f"[{code}] {name} 수집 시작…", flush=True)
        page = 1
        total_seen = 0
        office_hits = 0
        while True:
            rows, total = fetch_page(code, page)
            if not rows:
                break
            total_seen += len(rows)
            for r in rows:
                if matches(r):
                    matched.append(r)
                    office_hits += 1
            print(f"    p{page}: rows={len(rows)} cum={total_seen}/{total} hits+={office_hits}", flush=True)
            if total_seen >= total or len(rows) < PAGE_SIZE:
                break
            page += 1
            time.sleep(0.2)
        summary.append((code, name, total_seen, office_hits))
        print(f"[{code}] 완료: 전체 {total_seen}건 중 매칭 {office_hits}건", flush=True)

    with open(out_path, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS, extrasaction="ignore")
        w.writeheader()
        for r in matched:
            w.writerow({k: (r.get(k) if r.get(k) is not None else "") for k in FIELDS})

    print("\n=== 요약 ===", flush=True)
    print(f"{'코드':<6}{'교육청':<22}{'전체':>10}{'매칭':>8}")
    grand_total = 0
    grand_hits = 0
    for code, name, total, hits in summary:
        print(f"{code:<6}{name:<22}{total:>10}{hits:>8}")
        grand_total += total
        grand_hits += hits
    print("-" * 46)
    print(f"{'합계':<28}{grand_total:>10}{grand_hits:>8}")
    print(f"\n저장 위치: {out_path}")


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "data/computer_coding_academies.csv"
    main(out)
