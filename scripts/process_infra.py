import pandas as pd
import json
import os

def process_data():
    file_path = '/home/leehg/github/edudata/data/computer_coding_academies.csv'
    df = pd.read_csv(file_path)
    
    # 기초 지역 통계
    stats = df.groupby(['ATPT_OFCDC_SC_NM', 'ADMST_ZONE_NM']).size().reset_index(name='count')
    
    # JSON으로 변환하여 프론트엔드에서 사용 가능하게 저장
    result = stats.to_dict(orient='records')
    
    output_dir = '/home/leehg/github/edudata/public/data'
    os.makedirs(output_dir, exist_ok=True)
    
    with open(f'{output_dir}/it_infra.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 데이터 처리 완료: {len(result)}개 지역 통계 생성")

if __name__ == "__main__":
    process_data()
