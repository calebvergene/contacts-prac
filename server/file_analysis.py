import PyPDF2
import fitz
import pandas as pd
import spacy
from default_apps import skill_set
import json

def extract_text_from_pdf(file):
    """
    Extracts the text from a resume
    """
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page].extract_text()
    return text


def extract_skills(file, text, skill_set):
    """
    Analyzes text in a resume and compares words to a list of skills. If any skills are found in the resume, 
    they are pulled out and returned
    """
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    extracted_skills = set()

    # Look for any word or phrase in the skill set
    for token in doc:
        if token.text.lower() in skill_set:
            extracted_skills.add(token.text)
        

    # needs more testing, adds bolded words to the skills list
    doc = fitz.open(stream=file.read(), filetype="pdf")
    for page in doc:
        blocks = page.get_text("dict")["blocks"]
        for block in blocks:
            for line in block["lines"]:
                for span in line["spans"]:
                    if "Bold" in span["font"]:
                        print(span["text"].split())
                        extract_skills.add(span["text"].split())

    return extracted_skills


def analyze_resume(file):
    """
    Compares skills in resume to each job, creating a similarity score for each
    """
    nlp = spacy.load("en_core_web_md")
    text = extract_text_from_pdf(file)
    resume_skills = extract_skills(file, text, skill_set())
    print("Skills found:", resume_skills)


    resume_doc = nlp(" ".join(resume_skills))
    with open('server/application_data/extracted_swe_jobs.json', 'r') as file:
        all_applications = json.load(file)
        
        for application in all_applications:
            lst = []
            job_role_doc = nlp(" ".join(application['skills']))
            
            # Find matching skills
            for skill in resume_skills:
                for job_skill in application['skills']:
                    if skill in job_skill.split() or skill == job_skill:  # Properly formatted if statement
                        lst.append(f'{skill} matched with {job_skill}')
            
            # Print job name and similarity score
            print(application['name'], resume_doc.similarity(job_role_doc))
            print("Matched Skills:", lst)
            print()


"""
# Calculate similarity for each job role
similarity_results = {}
for role, skills in job_roles.items():
    similarity = calculate_similarity(normalized_resume_skills, skills)
    similarity_results[role] = similarity

# Rank based on similarity
ranked_similarity_roles = sorted(similarity_results.items(), key=lambda item: item[1], reverse=True)
print("Ranked job roles based on semantic similarity:")
for role, score in ranked_similarity_roles:
    print(f"{role}: {score:.2f} similarity")"""