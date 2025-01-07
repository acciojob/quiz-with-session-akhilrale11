() => {
  cy.visit(baseUrl + "/main.html");  // Visit the quiz page

  // Wait for questions container to be visible and ensure it exists
  cy.get('div#questions', { timeout: 10000 }).should('exist');  // Timeout after 10 seconds if not found

  // Ensure there are 5 questions
  cy.get("div#questions").children("div").should("have.length", 5);  // Check number of questions

  // Loop through questions and check each question's options
  cy.get("div#questions > div").each(($ele, index) => {
    // Verify the question text
    expect($ele.text().split("?")[0] + "?").to.equal(questions[index].question); 
    
    cy.wrap($ele).within(() => {
      // Verify each choice inside the current question
      cy.get("input").each((input, i) => {
        expect(input.attr("value")).to.equal(questions[index].choices[i]);
      });
    });
  });

  // Check if submit button exists
  cy.get("button#submit").should('exist');  

  // Check if the score div is empty initially
  cy.get("div#score").should("be.empty");
}
