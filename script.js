const drawButton = document.querySelector("a.btn.btn-outline-dark");
const checkButton = document.querySelector("input");
const resultTable = document.querySelector(".container.text-center.border");

function drawResults() {
  let firstPrize = Math.floor(Math.random() * 1000);
  firstPrize = firstPrize < 100 ? firstPrize + 100 : firstPrize;
  let adjacent1 = firstPrize - 1;
  adjacent1 = adjacent1 < 100 ? 999 : adjacent1;
  let adjacent2 = firstPrize + 1;
  adjacent2 = adjacent2 > 999 ? 100 : adjacent2;
  let adjacent3 = Math.floor(Math.random() * 1000);
  adjacent3 = adjacent3 < 100 ? adjacent3 + 100 : adjacent3;
  let adjacent4 = Math.floor(Math.random() * 1000);
  adjacent4 = adjacent4 < 100 ? adjacent4 + 100 : adjacent4;
  let secondPrize = Math.floor(Math.random() * 1000);
  secondPrize = secondPrize < 100 ? secondPrize + 100 : secondPrize;
  let lastTwoDigits = Math.floor(Math.random() * 100);
  lastTwoDigits = lastTwoDigits < 10 ? lastTwoDigits + 10 : lastTwoDigits;

  resultTable.children[0].children[1].textContent = firstPrize;
  resultTable.children[1].children[1].textContent = adjacent1;
  resultTable.children[1].children[2].textContent = adjacent2;
  resultTable.children[2].children[1].textContent = secondPrize;
  resultTable.children[2].children[2].textContent = adjacent3;
  resultTable.children[2].children[3].textContent = adjacent4;
  resultTable.children[3].children[1].textContent = lastTwoDigits;

  let resultLotto = [];
  resultLotto.push({ text: "รางวัลที่ 1", value: firstPrize });
  resultLotto.push({ text: "เลขข้างเคียง รางวัลที่ 1", value: adjacent1 });
  resultLotto.push({ text: "เลขข้างเคียง รางวัลที่ 1", value: adjacent2 });
  resultLotto.push({ text: "รางวัลที่ 2", value: secondPrize });
  resultLotto.push({ text: "รางวัลที่ 2", value: adjacent3 });
  resultLotto.push({ text: "รางวัลที่ 2", value: adjacent4 });
  resultLotto.push({ text: "รางวัลเลขท้าย 2 ตัว", value: lastTwoDigits });

  localStorage.setItem("lottoResult", JSON.stringify(resultLotto));
}

drawButton.addEventListener("click", () => {
  drawResults();
});

const checkResultButton = document.querySelector("button.btn.btn-primary");
const lotteryInput = document.querySelector("input");
const resultMessage = document.querySelector(".bg-warning");
checkResultButton.addEventListener("click", () => {
  checkResult();
});

function checkResult() {
  const lotto = localStorage.getItem("lottoResult");
  const lottoList = JSON.parse(lotto);
  const userNumber = parseInt(lotteryInput.value.trim());
  const lastNumber = parseInt(lotteryInput.value.slice(-2));

  const existing = lottoList.find((x) => x.value == userNumber);
  const existingLastNumber = lottoList.find((x) => x.value == lastNumber);
  if (existing != null) {
    resultMessage.textContent = "ยินดีด้วยคุณถูก" + existing.text;
    if (
      existingLastNumber != null &&
      existing.value != existingLastNumber.value
    ) {
      resultMessage.textContent =
        resultMessage.textContent + "และ" + existingLastNumber.text;
    }
  } else if (isNaN(userNumber)) {
    resultMessage.textContent = "กรุณาระบุเลขล็อตเตอรี่";
  } else {
    resultMessage.textContent = "เสียใจด้วยคุณไม่ถูกรางวัล";
  }
}
