---
layout: archive
title: ""
permalink: /cv/
author_profile: true
toc: true
scripts: [/assets/js/cv.js]
redirect_from:
  - /resume
---

{% include base_path %}


Education
======
**M.Eng** (Research) <br>
*Singapore University of Technology and Design* <br>
Expected 2025 Sep to 2026 Sep 
- Cumulative GPA: 5.00/5.00
- **AI Singapore Accelerated Masters Scholar** (2024 Sep - 2026 Sep)
- **DSO-AISG Research Award** (2025 Sep - 2026 Sep)

---

**B.Eng** (Computer Science, Minor in AI) <br>
*Singapore University of Technology and Design* <br>
2021 Sep to 2025 May
- Cumulative GPA: 4.70/5.00, **Honors with Highest Distinction**
- SUTD Undergraduate Merit Scholar (2021 Sep - 2024 Aug)

---

**Global Exchange Program** <br>
*Aalto University* <br>
Finland, Jan 2024 to Jun 2025
- Awarded the KKH Global Exchange Award (2024 Spring)
- Exchange Student under Aalto University's School of Science

<br>

Relevant Courses | Grade 
-----------------|------
51.511 Multimodal Generative AI – Postgraduate | A
99.512 Mathematics for AI – Postgraduate | A
51.504 Machine Learning – Postgraduate | A
50.050 Advanced Algorithms (Formerly Discrete Mathematics and Algorithm Design) | A
50.035 Computer Vision | A
50.007 Machine Learning - Undergraduate | A
01.117 Brain-Inspired Computing and it's Applications | A
CS-E4890 Deep Learning                             | Exchange
ELEC-E5550 Statistical Natural Language Processing | Exchange
CS-E4800 Artificial Intelligence                   | Exchange

<br>

Work Experience
======


{% include experience.html %}

**Technical Skills:** Python, PyTorch, TensorFlow, Google Cloud Platform, SQL, Java

<br>

# Publications
{% if site.publication_category %}
{% for category in site.publication_category %}
{% assign posts_in_category = site.publications | where: "category", category[0] | reverse %}
{% if posts_in_category.size > 0 %}
### {{ category[1].title }}
{% for post in posts_in_category %}{% include archive-single-publication.html %}{% endfor %}
{% endif %}
{% endfor %}
{% else %}
{% for post in site.publications reversed %}{% include archive-single-publication.html %}{% endfor %}
{% endif %}

{% include copy-bibtex.html %}
  

<!-- Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul> -->

<br>

# Teaching
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

<br>

# Community Service
  <ul>{% for post in site.service reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>