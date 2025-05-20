function calculatePCBScore() {
  try {
    const rows = document.querySelectorAll('#tblObjection > tbody > tr:nth-child(n+2)');
    
    if (!rows || rows.length === 0) {
      throw new Error("Could not find answer table. Please make sure you're on the correct page.");
    }

    let correctAnswersPhysics = 0;
    let wrongAnswersPhysics = 0;
    let correctAnswersChemistry = 0;
    let wrongAnswersChemistry = 0;
    let correctAnswersBiology = 0;
    let wrongAnswersBiology = 0;

    rows.forEach((row, index) => {
      const correctOptionElement = row.querySelector('td:nth-child(3) > table.table.table-responsive.table-bordered.center > tbody > tr > td:nth-child(1) > span');
      const candidateResponseElement = row.querySelector('td:nth-child(3) > table.table.table-responsive.table-bordered.center > tbody > tr > td:nth-child(2) > span');

      if (correctOptionElement && candidateResponseElement) {
        const correctOption = correctOptionElement.textContent.trim();
        const candidateResponse = candidateResponseElement.textContent.trim();

        if (index < 50) {
          correctOption === candidateResponse ? correctAnswersPhysics++ : wrongAnswersPhysics++;
        } else if (index < 100) {
          correctOption === candidateResponse ? correctAnswersChemistry++ : wrongAnswersChemistry++;
        } else {
          correctOption === candidateResponse ? correctAnswersBiology++ : wrongAnswersBiology++;
        }
      }
    });

    const totalScore = correctAnswersPhysics + correctAnswersChemistry + correctAnswersBiology;

    return {
      output: `
Physics - Correct Answers: ${correctAnswersPhysics}, Wrong Answers: ${wrongAnswersPhysics}
Chemistry - Correct Answers: ${correctAnswersChemistry}, Wrong Answers: ${wrongAnswersChemistry}
Biology - Correct Answers: ${correctAnswersBiology}, Wrong Answers: ${wrongAnswersBiology}
Total Score: ${totalScore} out of 200`
    };
  } catch (error) {
    return {
      output: `Error: ${error.message}`
    };
  }
}
