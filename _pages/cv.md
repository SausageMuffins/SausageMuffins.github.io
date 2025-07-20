---
layout: archive
title: ""
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

{% include toc %}


Education
======
**MEng** (Research), *Singapore University of Technology and Design*  
Singapore, Expected 2025 Sep to 2026 Sep 
- Cumulative GPA: -, -
- **AI Singapore Accelerated Masters Scholar** (2024 Sep - 2026 Sep)
- Expected Graduation Year: 2026

**BEng** in Computer Science, Minor in AI, *Singapore University of Technology and Design*  
Singapore, 2021 Sep to 2025 May
- Cumulative GPA: 4.70/5.00, **Honors with Highest Distinction**
- AI Singapore Accelerated Masters Scholar (2024 Sep - 2026 Sep)
- SUTD Undergraduate Merit Scholar (2021 Sep - 2024 Aug)

**Global Exchange Program**, *Aalto University*  
Finland, Jan 2024 to Jun 2025
- Awarded the KKH Global Exchange Award (2024 Spring)
- Exchange Student under Aalto University's School of Science

Relevant Courses | Grade 
-----------------|------
51.504 Machine Learning – Postgraduate | A
50.050 Discrete Math and Algorithm Design | A
50.035 Computer Vision | A
50.007 Machine Learning - Undergraduate | A
50.005 Elements of Software Construction | A-
01.401 Capstone Project (2 Terms) | A-
01.117 Brain-Inspired Computing and it's Applications | A
CS-E4890 Deep Learning                             | Exchange
ELEC-E5550 Statistical Natural Language Processing | Exchange
CS-E4800 Artificial Intelligence                   | Exchange

---

Work Experience
======


### Founding AI Engineer, Check (Iterative W25)
2025 January – March
- Built a Retrieval Augmented Generation (RAG) workflow to produce syllabus-accurate outputs, securing a Pre-Seed fund from Iterative VC (Winter 2025).
- Built a data processing pipeline by combining open-source Computer Vision models with LLMs, contributing 8,700 high quality questions to Supabase for RAG.
- Deployed DeepSeek R1 models to Google Cloud Run to solve Singapore GCE A-Level math problems, increasing the accuracy of the final outputs by 36%.

### LMM Research Assistant, Social AI Lab (SUTD)
2024 June – December
- Web scraped using Selenium and Beautiful Soup to collect more than 28,000 comics for analysis.
- Recruited and managed 8 participants to evaluate 2,800 comics using Label Studio to assess large multimodal models' (LMMs such as Qwen2-VL, LLaVa-OV, GPT4o and Gemini) ability to comprehend humor.

### LLM Research Intern, DSO National Laboratories
2023 August – December
- Applied the Graph of Thoughts reasoning workflow with LLMs to detect vulnerable code within a 3-layer call stack, reducing incurred API (ChatGPT) costs by 25%.
- Integrated Llama 2 and Code Llama with LangChain to perform Retrieval-Augmented Generation (RAG), further improving contextual understanding.

<!-- ### Undergraduate TA, SUTD
2022 September – December
- Taught small groups (4-5 per group) of students in the 10.014 Computational Thinking for Design module.
- Graded home assignments and lab work (programming a Raspberry Pi microcontroller) and maintained student records.
- Assisted faculty with the preparation of 20 unique questions for upcoming classes that test students on their coding (Python) abilities – search algorithms, functions and object-oriented programming questions. -->

**Technical Skills:** Python, PyTorch, TensorFlow, Google Cloud Platform, SQL, Java

---

# Publications
{% if site.publication_category %}
{% for category in site.publication_category %}
{% assign posts_in_category = site.publications | where: "category", category[0] | reverse %}
{% if posts_in_category.size > 0 %}
### {{ category[1].title }}
---
<ul>
{% for post in posts_in_category %}
<li>{% include archive-single-cv.html post=post %}</li>
{% endfor %}
</ul>
{% endif %}
{% endfor %}
{% else %}
<ul>
{% for post in site.publications reversed %}
<li>{% include archive-single-cv.html %}</li>
{% endfor %}
</ul>
{% endif %}
  

<!-- Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul> -->

---

# Teaching
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

---

# Community Service
  <ul>{% for post in site.service reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>