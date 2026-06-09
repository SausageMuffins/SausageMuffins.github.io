---
layout: archive
title: ""
permalink: /research/
author_profile: true
toc: true
---

{% include base_path %}

# Research Interests
## Motivations
My research is driven by the goal of Collaborative AI---to attain a symbiosis where humans and AI continuously improve or augment one another in a positive feedback loop. To establish this loop, I believe that artificial intelligence must possess **social intelligence** to communicate effectively with humans, and be able to **comprehend emergent knowledge** as the context evolves.

Current models exhibit an "intelligence" that appears to meet these needs, but this capability often stems from [scaling compute, data, and parameters](https://openai.com/index/scaling-laws-for-neural-language-models/). This approach is not only inefficient (relative to how humans learn), but it also promotes a black-box paradigm that discourages scientific methods. For these reasons, I try to move beyond simply "scaling" anything and everything and work towards a more mechanistic understanding of how concepts (and by extension, intelligence) emerge; this usually involves tuning one "knob" while holding others constant to isolate specific causes and effects. 

My long term vision is to develop **systematic approaches to represent emergent knowledge and phenomena** within or outside of the AI field. In doing so, I hope that my work would establish the positive feedback loop in Collaborative AI, driving the human-AI symbiosis to progress both artifical intelligence *and* humans.

## Current Interests
I enjoy bridging theories from outside machine learning---such as information theory (if we can even call this outside of ML...), the social sciences, or even philosophy---to construct rigorous hypotheses. Through these hypotheses, I seek to advance artificial intelligence in three key directions: **comprehending emergent ideas**, such as culture or humor; **analyzing emergent attributes** such as data quality or biases; and **managing emergent behaviors/properties** such as hallucinations and robustness.

My latest work utilizes the Partial Information Decomposition (PID) framework (from information theory) to analyze multimodal data. This allows me to derive insights from how modalities interact---redundant interactions (overlapping information), unique interactions (exclusive information), synergistic interactions (emergent information)---to provide task-relevant information. From these insights, I hypothesize and test how tuning these interactions, specifically increasing redundant interactions, would affect robustness.

<br>

---

# Publications

{% if site.author.googlescholar %}
  <div class="wordwrap">You can also find my articles on <a href="{{site.author.googlescholar}}">my Google Scholar profile</a>.</div>
{% endif %}

<!-- New style rendering if publication categories are defined -->
{% if site.publication_category %}
  {% for category in site.publication_category  %}
    {% assign title_shown = false %}
    {% for post in site.publications reversed %}
      {% if post.category != category[0] %}
        {% continue %}
      {% endif %}
      {% unless title_shown %}
##      {{ category[1].title }}
        {% assign title_shown = true %}
      {% endunless %}
      {% include archive-single-publication.html %}
    {% endfor %}
  {% endfor %}
{% else %}
  {% for post in site.publications reversed %}
    {% include archive-single-publication.html %}
  {% endfor %}
{% endif %}

{% include copy-bibtex.html %}


---

## Intrigued but Unavailable
I'm always intrigued by the potential of AI and the impact it can make in a variety of topics. Below is a list of projects that I wanted to explore, but currently unable to due to existing commitments. These projects are my "hear me out" ideas. If you are interested in collaborating for any of these, please do reach out :)

**Supervised Yearning: Learning the language of Love.**
Beyond the "5 love languages" (acts of service, quality time, gifts, touch, and affirmation) that naturally involve multiple modalities, I'm intrigued by the interplay of culture and romance. In particular,

- Can models learn "love languages" and adapt that knowledge to different cultures (East vs West).
- Can we quantify romance? What makes a love letter romantic?
- Can a model, trained on being an expert in romance, counter love scams: a type of scam that is not only <a href="https://www.dbs.com/livemore/money/types-of-scams-singapore.html" target="_blank">common</a> in Singapore, but also painful financially and emotionally? 
