---
layout: page
title: OSL Fifth Row
description: A web application developed for SUTD's Office of Student Life (OSL) to improve interaction between fifth rows and OSL.
img: assets/img/OSL_Fifth_Row_Forms.jpg
importance: 1
category: work
report_pdf: '/assets/pdf/ESC_report.pdf'
---

# Overview

OSL-Fifth Row App is a web application that aims to improve the event proposal form submission and management process for the Office of Student Life (OSL), Fifth-Row EXCOs and student government (ROOT) users


## Transferable Skills
1. Understood and applied the software development process to a medium to large scale project.
2. Utilized widely accepted notations and patterns, like **Unified Modelling Language (UML)**, to articulate and explore problems efficiently which faciliated smooth development workflows.
3. Various methods of testing such as **Black Box, White Box, Integration and System tests**.
4. Followed safe coding practices to ensure thread safety, prevent race conditions, and establish consistent clean code.
5. **Amazon Web Services (AWS)** for CI/CD, automated scaling and permission management for the software. 


---

## Project Contributions

This project is quite elaborate with 8 project members - categorized into the front end, back end and integration team. Hence, I will mostly be talking about my contributions to the project as part of the integration team (Cheng Ee and myself). Most of my work lie in **integrating the web application with AWS** as well as the **backend tests with the deployed software**. This project was coded in javascript.

In addition, I was involved with the initial design and planning stages of the software development life cycle. Specifically, I proposed the idea of utilizing Iterative and Incremental Development before switching to the Agile Manifesto throughout the whole process. 

The rationale behind this approach was to ensure the local product was thoroughly developed (Iterative Incremental Development) and tested before deploying on AWS (Agile Manifesto). This design stage also involved drafting the backend architecture - for which I was responsible for drawing up the AWS blueprint in this project.

The Github Repository can be found: [frontend](https://github.com/esctmp/osl-fifth-row-app), [backend](https://github.com/a-nnza-r/ESC_backend) as well as the [video presentation](https://drive.google.com/file/d/1sQpJY8KudrkNaZZT0YPnvjGOF1c7M81x/view). Kudos to my Vy and Chun Mun for the great presentation!

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/AWS_Architect.jpg" title="AWS Backend Blueprint" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The Backend AWS Architecture for the project - how we envisioned the project to be deployed.
</div>

---

## Learning AWS

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/AWS_phone.jpg" title="" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I had to do a lot of exploration and self learning about AWS for this project. In particular, this project made use of the AWS Amplify for a CI/CD pipeline from the the Github repository to deployement. 

In addition, I learnt a lot about permission management and networks through configurations with the **IAM service** and the **Virtual Private Cloud (VPC)** features of AWS. As the cloud architect, I had keep the project secure whilst allowing access to technical services wherever necessary for the project members.

In the technical aspect, I had to configure the **AWS RDS PostgreSQL database**, serverless **Lambda functions** to interact with the database, **API Gateway** to trigger these lambda functions and the tests required for these microservices. 

Through API Gateway, the frontend can effectively interact with the backend through API calls which abstracts away the backend details and keep the application secure.

Lastly, the integration team also included an authentication feature for various user types using **AWS Cognito** to fit the client's (OSL) requirements as it is being hosted on **AWS Amplify**. These "hands on" type of experiences and self learning brought out my curiosity and made learning so much more fun!  

---

## Testing the Software

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/code.jpg" title="" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

In an ideal world, the project would be complete with automated CI/CD with complete unit and integration test suites using Jest. However, the limited time frame made this integration unfeasible. Nevertheless, the test suites had to all the lambda functions, it's interaction with the Relational Database Service (RDS) PostgreSQL database. 

Most of the challenges we faced (John from the backend team and myself) was amending the test code to accept the JSON inputs from API gateway to the Lambda services. Moreover, we had to ensure that the software was integrated well and deployed on AWS which was a higher priority when compared to automated testing in the CI/CD pipeline.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/code.jpg" title="Example Code" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Evidence of testing for microservices (Lambda functions) using AWS SDK - Screenshot provided by John.
</div>

---

## Reflection

In my opinion, the project was a great learning experience and is successful because of the following points: 

1. The project works as intended and it satisfies the client’s (OSL) requirements.
2. The project is extensively tested and developed.
3. I had to go beyond my comfort zones to learn more skills that are outside of the classroom. For me, any project that can push me to gain useful skills (eg: Use of Amazon Cloud services) is a successful project.

Naturally, there will always be points for improvement:

1. The project could have started development on the cloud service from the beginning to capitalize on useful features on AWS. This could also buy us more
time to integrate and resolve bugs. However, I do recognize that this point is in hindsight. At the start of the project, the majority of us in the group did not
possess the sufficient skill set to work on AWS.
2. Communication was largely good but there were a few miscommunications at various stages of the project. These miscommunications were minor but it does lead to inefficiencies and time loss. For instance, we got confused occasionally for which github branch with the latest (or main) version to work with.

Lastly, I have to thank my wonderful group mates in making the OSL Fifth Row web application possible. Kudos to John, Chun Mun, Gizelle, Ansar, Vy, Jun Kiat, Cheng Ee. 

---


The final project report can be found attached as a pdf here:  
<a href="{{ site.baseurl }}{{ page.report_pdf }}" target="_blank" class="pdf-download-icon"><i class="fas fa-file-pdf"></i> Final Report</a>