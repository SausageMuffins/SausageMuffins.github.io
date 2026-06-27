---
title: "Self-Captioning Multimodal Interaction Tuning: Amplifying Exploitable Redundancies for Robust Vision Language Models"
collection: publications
category: conferences
permalink: /publication/2026-05-01-MIT
excerpt: 'Amplifying redundant interactions to train robust vision language models.'
date: 2026-05-01
venue: '43rd Proceedings of the International Conference on Machine Learning, Seoul, South Korea (ICML 2026)'
authors: 'Yuriel Ryan, Ip Hei Man, Adriel Kuek, Paul Pu Liang, Roy Ka-Wei Lee'
authors_note: 
paperurl: 'https://icml.cc/virtual/2026/poster/61360'
citation: |
  @inproceedings{ryan2026selfcaptioning,
      title = "Self-Captioning Multimodal Interaction Tuning: Amplifying Exploitable Redundancies for Robust Vision Language Models",
      author = "Ryan, Yuriel  and
        Ip, Hei Man  and
        Kuek, Adriel  and
        Liang, Paul Pu  and
        Lee, Roy Ka-Wei",
      booktitle = "Forty-third International Conference on Machine Learning",
      year = "2026",
      url = "https://openreview.net/forum?id=r05rSbN4vI"
  }
---

Current vision language models face hallucination and robustness issues against ambiguous or corrupted modalities. We hypothesize that these issues can be addressed by exploiting the shared information between modalities to compensate for the impaired one. To this end, we analyze multimodal interactions -- redundant (shared), unique (exclusive), and synergistic (emergent) task-relevant information provided by the modalities -- to determine their impacts on model reliability. Specifically, amplifying redundant interactions would increase this exploitable shared information to resolve these issues; yet, modern instruction datasets often eliminate redundancies to prioritize visual grounding. We bridge this gap through a self-captioning workflow featuring a \textsc{Multimodal Interaction Gate}: a mechanism to convert unique interactions into redundant interactions. Our findings suggest that increasing redundancy can reduce visual induced errors by 38.3% and improve consistency by 16.8%.