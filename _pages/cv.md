---
layout: archive
title: ""
permalink: /cv/
author_profile: true
toc: true
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


### Research Intern, DSO-AISG Research Award
2025 September – Present

**Label-Free Self-Evolving VLMs** (ongoing project) | [GitHub](https://github.com/yurielryan/LMM-Video-Understanding) <br>
2026 June – Present
- Reproduced the full Video-Zero training stack (a self-evolving video LLM) from the paper's equations to serve as the project baseline: a Questioner and a Solver (Qwen 3.5 9B on verl and vLLM) co-evolve with GRPO, using consensus pseudo-labels as the training signal.
- Ran multi-model RL on shared GPUs, with a frozen vLLM policy server scoring rewards during GRPO training. A full 5-iteration co-evolution pipeline runs end-to-end in ~4.5h on 2× H200 under SLURM.
- Adapted the pipeline to ternary sentiment using self-generated pseudo-labels (majority voting), raising video-only accuracy over the base model from 41.9% to 44.2% with no human-written annotations or labels.

**Self-Reinforcing VLMs** (completed project – ICML 2026) | [GitHub](https://github.com/yurielryan/Multimodal-Interaction-Tuning) <br>
2025 September – 2026 June
- Collaborated with research scientists from DSO National Laboratories as part of the research award to improve VLM robustness against ambiguous and corrupted modalities.
- Applied the Partial Information Decomposition (information theoretic) framework to motivate hypotheses and design experiments for tuning multimodal interactions.
- Curated training (e.g. cleaning, deduplication) and validation partitions using vLLM, yielding three training sets (984,000 samples) of varying redundant interactions for supervised fine-tuning (PEFT with LoRA).
- Tested the hypotheses by fine-tuning VLMs — ranging from 256M (SmolVLM) to 8B (LLaVa-OneVision) parameters — with low rank adapters, leading to a 38.3% decrease in visual-induced hallucinations and 16.8% gain in consistency; methods and findings were accepted into the ICML main track.

### Founding AI Engineer, Pallo (formerly Check) (Iterative W25)
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