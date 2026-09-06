---
layout: archive
title: ""
permalink: /research/
author_profile: true
toc: true
---

{% include base_path %}

# Motivations
My research is driven by the goal of **Collaborative AI** --- a deliberate push to have humans and AI continuously augment each other in a positive feedback loop. To establish this, I believe that artificial intelligence should be able to **continuously adapt or evolve** to humans or to the problem at hand. This means posessing qualities that go beyond rote learning (e.g., social intelligence or autonomy to propose tasks and to learn on its own).

Current models exhibit an "intelligence" that appears to meet these needs, but this capability often stems from [scaling compute, data, and parameters](https://openai.com/index/scaling-laws-for-neural-language-models/). This approach is not only inefficient (relative to how humans learn), but also promotes a black-box paradigm that discourages scientific methods. For these reasons, I try to move beyond simply scaling anything and everything, and work towards a more mechanistic understanding of how concepts --- and by extension, intelligence --- emerge; this usually involves tuning one "knob" while holding others constant to isolate specific causes and effects.

I also think this human-AI symbiosis could manifest as a form of **Collective Intelligence**: humans and agents (or even between clusters of each side) exchanging what they know for the collective to benefit. To this end, I am looking to work on self/co-evolving agents (as a prospective PhD student) through the different lenses of **Information Theory**. For example, modelling multi-agent system as a communication channel (e.g., how much of the task-relevant signal is accessible/preserved/is faithful when information flows from one agent to another) or considering what is accessible or useful information to an agent (e.g., V-Information or PID).

# Current Works
I enjoy bridging ideas from outside machine learning --- such as information theory (if we can even call this outside of ML...), the social sciences, or even philosophy --- to construct research questions. 

My [latest work](https://icml.cc/virtual/2026/poster/61360) utilizes the Partial Information Decomposition (PID) framework to analyze multimodal data. This allows me to derive insights from how modalities interact --- redundant interactions (overlapping information), unique interactions (exclusive information), synergistic interactions (emergent information) --- to produce task-relevant information. I then operationalize these insights to systematically tune these interactions in instruction datasets. In doing so, I showed that carefully increasing redundant interactions could train vision language models that are more robust to hallucinations and ambiguous modalities.

**[Ongoing]** Self-evolving agents for social behavior. I'm thinking about representing how we (the humans) infer social cues (e.g., emotions) through a "lossy channel" (See figure below). This could help inform "how much information is lost/preserved" for an agent to improve itself in producing a faithful internal state.

![Diagram of social inference as a lossy channel: a distressed person (internal state Z) encodes a smiling face ("I'm fine", observed behavior X), and a perceiver infers a calm state Z-hat, reading them as fine.](/images/lossy_humans.jpg)

<br>

---

# Publications

{% if site.author.googlescholar %}
You can also find my articles on [my Google Scholar profile]({{ site.author.googlescholar }}).
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
