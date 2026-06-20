import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class CBRRetriever:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.case_vectors = None
        self.cases = None

    def fit(self, cases: pd.DataFrame, text_column: str = "text_full"):
        self.cases = cases.copy()
        self.case_vectors = self.vectorizer.fit_transform(
            self.cases[text_column].fillna("")
        )
        return self

    def retrieve(self, query: str, k: int = 5):
        query_vector = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vector, self.case_vectors).flatten()

        top_indices = similarities.argsort()[::-1][:k]

        results = self.cases.iloc[top_indices].copy()
        results["similarity_score"] = similarities[top_indices]

        return results
