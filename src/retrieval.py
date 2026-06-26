from __future__ import annotations
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from src.preprocessing import clean_for_model

def retrieve(query: str, train_df: pd.DataFrame, vectorizer, tfidf_matrix, k: int = 5) -> pd.DataFrame:
    query_clean = clean_for_model(query)
    query_vector = vectorizer.transform([query_clean])
    similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    top_indices = similarities.argsort()[::-1][:k]
    results = train_df.iloc[top_indices].copy()
    results["similarity_score"] = similarities[top_indices]
    return results

def weighted_vote_solution(top_k_df: pd.DataFrame) -> str:
    scores = {}
    for _, row in top_k_df.iterrows():
        label = row.get("solution_label", "Tidak Ada Label")
        scores[label] = scores.get(label, 0.0) + float(row.get("similarity_score", 0.0))
    if not scores:
        return "Tidak Ada Prediksi"
    return sorted(scores.items(), key=lambda item: item[1], reverse=True)[0][0]
