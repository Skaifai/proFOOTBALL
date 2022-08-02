const yourResults = document.getElementById("results");

const yourBtn = document.getElementById("submit-btn");

yourBtn.addEventListener("click", appearRes);

const text1 = document.getElementById("team1");

const text2 = document.getElementById("team2");

const score1 = document.getElementById("score1");

const score2 = document.getElementById("score2");

const result1 = document.getElementById("result1");

const result2 = document.getElementById("result2");

const winner = document.getElementById("winner");

function checkScore(scoreInput, teamNum) {
  const score = +scoreInput.value;
  // console.log(typeof score);
  if (score < scoreInput.min) {
    alert(`Score of team ${teamNum} cannot be negative!`);
    return false;
  }

  if (score > scoreInput.max) {
    alert(`Score of team ${teamNum} cannot exceed 5!`);
    return false;
  }

  return true;
}

function checkText(textInput, teamNum) {
  const text = textInput.value;
  if (text.length === 0) {
    alert(`You need to input names of the players of team ${teamNum}!`);
    return false;
  }

  const lines = text.split(",");
  if (lines.length < 7) {
    alert(`No less than 7 players in team ${teamNum}!`);
    return false;
  }

  if (lines.length > 11) {
    alert(`No more than 11 players in team ${teamNum}!`);
    return false;
  }

  return true;
}

function giveRes(scoreInput1, scoreInput2, winnerInput) {
  const score1 = +scoreInput1.value;
  const score2 = +scoreInput2.value;

  if (score1 + score2 > 7) {
    alert("The sum of the scores cannot exceed 7!");
    return;
  }

  if (score1 > score2) {
    winnerInput.value = "Team 1 won!";
    return;
  }

  if (score1 < score2) {
    winnerInput.value = "Team 2 won!";
    return;
  }

  if (score1 === score2) {
    winnerInput.value = "Tie!";
    return;
  }
}

function printSumRec(scoreInput, curSum, startPoint, result, output) {
  if (curSum === scoreInput) {
    output.push(`(${result.slice()})`);
  }

  for (let i = startPoint; i < scoreInput; i++) {
    let temporary = curSum + i;
    if (temporary <= scoreInput) {
      result.push(i);
      printSumRec(scoreInput, temporary, i, result, output);
      result.pop();
    } else {
      return;
    }
  }
}

function printSum(scoreInput) {
  let output = [];
  let result = [];
  printSumRec(scoreInput, 0, 1, result, output);
  return output;
}

function appearRes(event) {
  if (
    checkText(text1, 1) === true &&
    checkText(text2, 2) === true &&
    checkScore(score1, 1) === true &&
    checkScore(score2, 2) === true
  ) {
    yourResults.style.display = "flex";
    result1.value = printSum(+score1.value);
    result2.value = printSum(+score2.value);
    giveRes(score1, score2, winner);
  }
}
