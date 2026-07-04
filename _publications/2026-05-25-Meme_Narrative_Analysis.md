---
title: "Large Scale Narrative Analysis of Multimodal Memes"
collection: publications
category: conferences
permalink: /publication/2026-05-25-meme-narrative-analysis
excerpt: 'MemeTopicTrees (MemeTT): a zero-shot pipeline that clusters multimodal memes and generates narratives for meme corpora at scale.'
date: 2026-05-25
venue: 'Proceedings of the 20th International AAAI Conference on Web and Social Media, Los Angeles, USA (ICWSM 2026)'
venue_short: 'ICWSM'
authors: 'Jia Wang Peh, Ming Shan Hee, Bryan (Chen Zhengyu) Tan, Yuriel Wang Jun Long Ryan, Roy Ka-Wei Lee'
authors_note: 
paperurl: 'https://ojs.aaai.org/index.php/ICWSM/article/view/42722'
citation: |
  @article{peh2026large,
      title = "Large Scale Narrative Analysis of Multimodal Memes",
      author = "Peh, Jia Wang  and
        Hee, Ming Shan  and
        Tan, Bryan (Chen Zhengyu)  and
        Ryan, Yuriel Wang Jun Long  and
        Lee, Roy Ka-Wei",
      journal = "Proceedings of the International AAAI Conference on Web and Social Media",
      volume = "20",
      number = "1",
      pages = "1767--1796",
      year = "2026",
      month = "May",
      doi = "10.1609/icwsm.v20i1.42722",
      url = "https://ojs.aaai.org/index.php/ICWSM/article/view/42722"
  }
---

Current computational approaches to meme analysis primarily focus on individual memes, with an emphasis on tasks such as hateful content detection and sentiment analysis. In contrast, corpus-level analyses, which are necessary to reveal in-depth thematic narratives embedded in meme corpora, have remained within the purview of social science research. While qualitative methods such as inductive content analysis provide deeper insights, they are labor-intensive and lack scalability. To address this gap, we introduce MemeTopicTrees (MemeTT), a zero-shot pipeline that clusters multimodal memes based on their targets, aspects, sentiments, and opinions. In addition to clustering, MemeTT generates a descriptive narrative for each cluster to provide a nuanced understanding of meme corpora. By integrating multimodal aspect-based sentiment analysis with hierarchical clustering, MemeTT automates both semantic analysis and narrative generation at scale. Evaluated on a combined pool of three datasets spanning political, public health, and defense domains, MemeTT successfully produces fine-grained clusters and coherent narratives, with narrative relevance most pronounced at the target and aspect levels. Evaluations show that the best-performing models are highly accurate at identifying meme targets and aspects, although maintaining high accuracy for opinions and sentiments remains challenging. Furthermore, while cluster distinctiveness is robust at the target level, room for improvement remains at lower clustering levels. Despite these challenges, this approach offers a scalable solution for analyzing public sentiment and discourse in meme corpora. We lay the foundation for future research on the understudied task of automated meme corpus analysis.
