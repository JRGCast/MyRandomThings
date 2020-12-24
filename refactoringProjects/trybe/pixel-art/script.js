window.onload = () => {
  document.getElementById('color-palette').firstElementChild.className =
    'color selected';
};

// Função cores aleatórias (suporte para paleta de cores):
const randomColor = () => {
  const colorRGB = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255,
  )}, ${Math.floor(Math.random() * 255)})`;

  return colorRGB;
};

// Função coloração das color-pallete:
const theColorPallete = () => {
  const coresFundo = [
    'black',
    randomColor(),
    randomColor(),
    randomColor(),
    'none',
  ];
  const palette = document.getElementById('color-palette');
  coresFundo.forEach((element) => {
    const quadradosCores = document.createElement('li');
    quadradosCores.className = 'color';
    quadradosCores.style.backgroundColor = element;
    palette.appendChild(quadradosCores);
  });
};
theColorPallete();

const dropDownClrs = () => {
  const colorsArr = ['Red', 'Blue', 'Green', 'Yellow'];
  const inputCLr = document.querySelector('#choose-color');
  colorsArr.forEach((element) => {
    const colors = document.createElement('option');
    colors.style.color = element;
    colors.value = element;
    colors.appendChild(document.createTextNode(element));
    inputCLr.appendChild(colors);
  });
};

const generateColor = () => {
  const palette = document.getElementById('color-palette');
  const inputCLr = document.querySelector('#choose-color');
  palette.lastElementChild.style.border = '3px solid black';
  inputCLr.addEventListener('mouseover', () => {
    inputCLr.innerHTML === '' ? dropDownClrs() : false;
  });
  inputCLr.addEventListener('change', () => {
    palette.lastElementChild.style.backgroundColor = inputCLr.value;
    inputCLr.style.color = inputCLr.value;
  });
};
generateColor();
// Função criação do quadro de pixels:
const quadroPixels = (num = 5) => {
  // Mudei a declaração de variável para virar parâmetro;
  const squareContainer = document.getElementById('pixel-board');
  for (let i = 1; i <= num; i += 1) {
    const linhaPixels = document.createElement('div');
    linhaPixels.className = 'pixel-line';
    squareContainer.appendChild(linhaPixels);

    for (let j = 1; j <= num; j += 1) {
      const colunaPixels = document.createElement('div');
      colunaPixels.className = 'pixel';
      linhaPixels.appendChild(colunaPixels);
    }
  }
};
quadroPixels();

// Função selecionar cor e mudar a classe da li da color-palette:
const selectColor = () => {
  const quadros = document.getElementById('color-palette').children;
  const paleta = document.getElementById('color-palette');

  paleta.addEventListener('click', function (event) {
    for (let i = 0; i < quadros.length; i += 1) {
      if (quadros[i] === event.target) {
        event.target.className = 'color selected';
      } else {
        quadros[i].className = 'color';
      }
    }
  });
};
selectColor();

// Função para pintar os pixels (por algum motivo também pinta o #pixel-board):
const pintaCor = () => {
  const quadroPixel = document.getElementById('pixel-board');
  const pintation = (event) => {
    const selectedColor = document.querySelector('.selected').style
      .backgroundColor;
    event.target.style.backgroundColor = selectedColor;
  };
  quadroPixel.addEventListener('click', pintation);
  quadroPixel.addEventListener('mousedown', () => {
    quadroPixel.addEventListener('mouseover', pintation);
  });
  quadroPixel.addEventListener('mouseup', () => {
    quadroPixel.removeEventListener('mouseover', pintation);
  });
};
pintaCor();

// Função criação dinâmica do botão #clear-board:
function botaoLimpar() {
  const buttonContainter = document.getElementById('button-container');
  const buttonClear = document.createElement('button');
  buttonClear.id = 'clear-board';
  buttonClear.innerText = 'Limpar';
  buttonContainter.appendChild(buttonClear);
}
botaoLimpar();

// Função tornar branco o fundo de todos os pixels (com clique no botão Limpar):
const clearBtn = () => {
  const btnClear = document.getElementById('clear-board');
  btnClear.addEventListener('click', () => {
    const pixelNumbers = document.getElementsByClassName('pixel').length;
    for (let i = 0; i < pixelNumbers; i += 1) {
      document.querySelectorAll('.pixel')[i].style.backgroundColor = 'white';
    }
  });
};
clearBtn();

// Função para checar e criar novo board (ainda falta entender como apagar o board antigo):
const inputedValueCheck = () => {
  const btnGen = document.getElementById('generate-board');
  btnGen.addEventListener('click', () => {
    let inputedValue = document.getElementById('board-size').value;
    let correctValue;
    if (inputedValue === '') {
      alert('Board inválido!');
    }
    if (inputedValue > 50) {
      inputedValue = 50;
    }
    if (inputedValue < 5) {
      inputedValue = 5;
    }
    if (inputedValue >= 5 || inputedValue <= 50) {
      correctValue = inputedValue;
      const quadro = document.getElementById('pixel-board');
      quadro.innerHTML = '';
      quadroPixels(correctValue);
    }
  });
};
inputedValueCheck();
