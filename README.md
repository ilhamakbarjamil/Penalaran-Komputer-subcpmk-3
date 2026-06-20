# Case-Based Reasoning for Court Decision Retrieval

## Project Title
Case-Based Reasoning System for Pidana Umum - Pencurian Court Decisions at PN Tangerang

## Description
This project implements a simple Case-Based Reasoning (CBR) system using Python to support retrieval and reuse of Indonesian court decisions. The selected legal domain is Pidana Umum - Pencurian from PN Tangerang, with 40 court decision documents.

## Project Structure

```text
data/
  raw/          Raw text documents
  processed/    Processed case data
  eval/         Evaluation queries and metrics
  results/      Prediction and retrieval results

notebooks/
  01_data_collection.ipynb
  02_case_representation.ipynb
  03_case_retrieval.ipynb
  04_solution_reuse.ipynb
  05_evaluation.ipynb

src/
  preprocessing.py
  retrieval.py
  evaluation.py

logs/
  cleaning.log

