---
layout: page
title: Sentiment and Entity Identification
description: A machine learning project that identifies sentiments and entities on russian and spanish tweets.
img: assets/img/tweet_img.jpg
importance: 1
category: work
---

# Overview

This machine learning (NLP) project deals with sentiment analysis and entity identification. The motivation behind this project is to identify how people feel towards certain products or "entities".


## Transferable Skills
1. Understanding and applying Hidden Markov Models (HMM).
2. Supervised Learning techniques (EM algorithm) to train a model based on text.
3. Understanding and applying algorithms to predict and decode sentences. (Viterbi algorithm, forward and backward algorithm)
4. Data processing and tweaking algorithms to achieve desired results (smoothing techniques)
5. Training and cross validating different models to achieve optimal results.

---

# Introduction

### Tokens and Tags

Let's use the example **"The Ice-cream from X-company is BUSSIN!"**.

Each individual word is a token and has a tag to indicate 
1) whether it is an entity.
2) a positive or negative sentiment.

Eg: "The" has a tag of "O" to indicate outside of an entity whereas "Ice-cream" could have a tag of "B-Positive" for the beginning of an entity + positive sentiments.

Here are the possible tags:
- "O" outside
- "B-Positive" beginning of an entity with positive sentiments
- "B-Neutral" beginning of an entity with neutral sentiments
- "B-Negative" beginning of an entity with negative sentiments
- "I-Positive" inside of an entity with positive sentiments
- "I-Neutral" inside of an entity with neutral sentiments
- "I-Negative" inside of an entity with negative sentiments

The data set will be involved with Spanish and Russian tweets.

---

## General Approach

This project is done together with three other amazing people: Lucas Toh, Ansar and Jone Chong. This post will mainly document my contributions in this project and what I have learnt.

[Project Code](https://github.com/a-nnza-r/ML-proj)

General Algorithm for the project:
1. Define necessary constants such as results (dictionary) and k_values (a list with a range
of hyperparameters to try) to be used later.
2. **Data Preparation stage**
3. Estimate transmission probabilities.
4. **Model Training**: Estimate emission probabilities with different smoothing techniques and
store their results into the results dictionary.
5. **Prediction and Validation**: Predict using viterbi’s algorithm and select the best smoothing
method (highest entity F scores)
6. Use the selected models (includes emission and transition probabilities) to predict tags on the development set (which we also used as
the validation set) as well as the given test set.

We came up with this general algorithm after considering other methods and realized that the most (time and meaningfully) efficient way (within our capabilities) to improve F scores without drastically changing the system entirely is to train models using various smoothing methods.

Hence, we explored three different smoothing techniques and experimented with the
hyperparameters (if any) with the objective of achieving a robust system. We considered the nature of the project, and realized that there can be a lot of unknown words in any test data set.

As such, we wanted the new system to train a model to be as robust as possible by accounting for zero probabilities and unknown words.

---

## Project Stages:

These stages are the details of what our group did to train various models and predict the tags associated with each token. 


1. Data Preparation
    - prepare_data(file_path): Prepares the data including mappings for states and
    observations.

2. Hyperparameter Tuning
    - Laplace Smoothing: Iterates through k values (from 0.1 to 1) to optimize emission
    probabilities.
    - Absolute Discounting: Iterates through d values (from 0.01 to 1) to optimize emission
    probabilities using absolute discounting.
    - Witten-Bell Smoothing: Applies Witten-Bell smoothing to emission probabilities.

3. Model Training
    - estimate_transmission_parameters(): Estimates transition probabilities.
    - estimate_emission_parameters(): Estimates emission probabilities specific to Laplace
    smoothing.
    - estimate_emission_parameters_absolute_discounting(): Specific to Absolute
    Discounting.
    - estimate_emission_parameters_witten_bell(): Specific to Witten-Bell smoothing.

4. Prediction & Cross Validation
    - viterbi(): Runs the Viterbi algorithm on validation data (dev data set).
    - write_predictions_to_file(): Writes the predicted tags to a file.
    - compute_scores(): Computes metrics such as precision, recall, and F1 score for both
    entities and sentiments by importing the given evaluation script.

5. Final Model Selection & Testing
    - best_results(): Identifies the best smoothing method and corresponding
    hyperparameters.
    - Retraining the model with the best method.
    - Prediction on the validation set and writing predictions (dev.p4.out).
    - Prediction on the test set with viterbi() and writing predictions to file. (test.p4.out)


---

# Results

The results are calculated using precision and recall. The F score is subsequently calculated based on both the precision and recall. Both entity and sentiments have their own corresponding score.

## Before Changes (a typical default model with no smoothing)
#### Initial Spanish Results
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ES_2.png" title="Training Result" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ES_8.png" title="Validation Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Spanish results of the default HMM model with Viterbi algorithm
</div>

#### Initial Russian Results

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/RU_2.png" title="Training Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Russian results of the default HMM model with Viterbi algorithm
</div>

## After Changes (best model selected with absolute discount smoothing)
#### Spanish Results
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ES_4.png" title="Training Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Spanish results after our changes and implementation of our system
</div>

#### Russian Results
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/RU_4.png" title="Training Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Russian results after our changes and implementation of our system
</div>

