---
layout: archive
title: ""
permalink: /research/
author_profile: true
---

{% include base_path %}

{% include toc %}

# Research Interests
I center my work on **Multimodal Collaborative AI**: intelligent systems that use different types of information to collaborate with humans and non-humans to achieve shared goals. **Multimodal** because of how we naturally perceive and interact with our world using different modes of information (our five senses: sight, hearing, smell, taste and touch). **Collaborative** because I aspire to develop (socially) intelligent systems that work together with us, the humans, and also with non-humans like other agents, systems or even animals/pets to achieve shared goals.

## Current Work
Within this broad theme of Collaborative AI, I try to work on two fundamental challenges: Representation and Quantification. These two fields are quintessential in multimodal machine learning to enable downstream collaborative tasks. 


## Intrigued but Unavailable
I'm always intrigued by the potential of AI and the impact it can make in a variety of topics. Below is a list of projects that I wanted to explore, but currently unable to due to existing commitments. These projects are my "hear me out" ideas. If you are interested in collaborating for any of these, please do not hesitate to reach out!

**Supervised Yearning: Learning the language of Love.**
Beyond the "5 love languages" (acts of service, quality time, gifts, touch, and affirmation) that naturally involve multiple modalities, I'm intrigued by the interplay of culture and romance. In particular,

- Can models learn "love languages" and adapt that knowledge to different cultures (East vs West).
- Can we quantify romance? What makes a love letter romantic?
- Can a model, trained on being an expert in romance (lol), counter love scams: a type of scam that is not only <a href="https://www.dbs.com/livemore/money/types-of-scams-singapore.html" target="_blank">common</a> in Singapore, but also painful financially and emotionally? 

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
      {% include archive-single.html %}
    {% endfor %}
  {% endfor %}
{% else %}
  {% for post in site.publications reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}
