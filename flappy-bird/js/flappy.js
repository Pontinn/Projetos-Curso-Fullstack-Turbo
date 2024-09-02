//Função que cria elementos.
function newElement(tagName, className){
    //Cria tagName.
    const elem = document.createElement(tagName)
    //Adiciona uma classe a tag name criada.
    elem.className = className
    //Retorna as informações para a função.
    return elem
}
  
//Função que cria as duas barreias, mas estão fora de posição.
function Barrier(reverse = false){

    this.element = newElement('div', 'barreira')

    const border = newElement('div', 'borda')
    const body = newElement('div', 'corpo')

    //Cria as barreias, uma em cada direção de acordo com o resultado do boolean, usando operador ternário.
    this.element.appendChild(reverse ? body : border)
    this.element.appendChild(reverse ? border : body)

    //Pega o atributo height do CSS e atribui a uma função chamada setHeight, com uma propriedade "height" para que possar ser alterada.
    this.setHeight = height => body.style.height = `${height}px`

}

function BarrierPairs(height, opening, xPosition){    
    //Criando Par de barreiras e adicionando a estrutura HTML.
    this.element = newElement('div', 'par-de-barreiras')

    //Define que uma barreira vai ser inversa a outra.
    this.top = new Barrier(true)
    this.bottom = new Barrier(false)

    //Cria as barreiras no HTML de acordo com os elementos acima.
    this.element.appendChild(this.top.element)
    this.element.appendChild(this.bottom.element)

    //Randomizando a abertura entre elas.
    this.randomOpening = () => {
        //Randomizar a altura do elemento superior e faz com que o elemento de baixo acompanhe.
        const topHeight = Math.random() * (height - opening)
        const bottomHeight = height - opening - topHeight

        //Atribui os valores do "topHeight" e "bottomHeight" para a função "setHeight".
        this.top.setHeight(topHeight)
        this.bottom.setHeight(bottomHeight)
    }

    //O método split() pega o numero atribuido a "left" no CSS retira o "px" do final e fica somente com o numero antes do "px" em um array.
    this.getX = () => parseInt(this.element.style.left.split('px'))

    //Atribui o elemento "left" do CSS a uma função chamada "setX".
    this.setX = x => this.element.style.left = `${x}px`
    
    //A propriedade clientWidth é uma propriedade nativa existente em DOM, e retorna o valor total da largura de um elemento.
    this.getWidth = () => this.element.clientWidth 

    this.randomOpening()
    this.setX(xPosition)
        
}

function Barriers(height, width, opening, space, pointNotification){

    //Cria 4 pares de barreiras de maneira com que mantenha um padrão de espaçamento entre elas.
    this.pairs = [
        new BarrierPairs(height, opening, width),
        new BarrierPairs(height, opening, width + space),
        new BarrierPairs(height, opening, width + space * 2),
        new BarrierPairs(height, opening, width + space * 3)
    ] 

    //Define a quantidade de pixels que a barreira vai se mover a cada frame de animação.
    const displacement = 3

    this.animation = () => {
        this.pairs.forEach(pair => {
            //getX está pegando o valor do x em string, transformando a string em numero inteiro, subtraindo o displacement e passando o valor para o setX.
            //A subtração do displacement faz com que a barreira se mova. Quanto mairo o numero do displacement mais rápido ela se move.
            pair.setX(pair.getX() - displacement)

            //Caso a barreira tenha saindo completamente da tela a esquerda ela cria outra a direita, criando um loop infinito.
            /*
            A expressão "-pair.getWidth()" possui o simbolo de subtração para garantir que o valor seja tratado como numero negativo,
            ou seja, se o "left" atribuido a função getX() for negativo, ele cria outra barreira a direita.
            */
            if(pair.getX() < -pair.getWidth()) {
                pair.setX(pair.getX() + space * this.pairs.length)
                //Randomiza a abertura para que haja variedade no jogo.
                pair.randomOpening()
            }

            //Constante "mid" retorna o valor total da width e divide por 2, ou seja, o meio da largura.
            const mid = width / 2 
            //Contante crossMid checa se as barreiras cruzaram o meio da tela.
            const crossMid = pair.getX() + displacement >= mid 
                && pair.getX() < mid
                //Se a barreira cruzou, chama a função pointNotification().
                if(crossMid) pointNotification()
        })
    }
}

//Cria uma função construtora chama Bird, com propriedade gameHeight.
function Bird(gameHeight) {
    //Cria uma função chamada "flying"(voando), que por padrão, está definido como falso.
    let flying = false

    //Cria o elemento passaro
    this.element = newElement('img', 'passaro')
    //Atribuido o direcionamento para que a imagem passaro.png sejá adicionada ao elemento.
    this.element.src = 'imagens/passaro.png'

    //getY pega o atributo "bottom" do CSS e retira o "px", além disso faz com que o numero deixe de ser uma string e se torne um numero inteiro.
    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    //Pega o valor y(neste caso) e atribui ao atributo "bottom" do CSS e adiciona o "px" no final.
    this.setY = y => this.element.style.bottom = `${y}px`

    //Caso qualquer tecla seja pressionada, flying(voando) se torna verdadeiro .
    window.onkeydown = e => flying = true
    //Caso não tenha nenhuma tecla sendo pressionada, flying(voando) se torna falso.
    window.onkeyup = e => flying = false

    this.animation = () => {
        /*
        Valor de getY é atribuido a newY. Usando como referência o operador ternário, ou seja, se flying = true adicione 8.
        Caso seja false, subtraia 5. Isso faz com que o passaro suba ou desça.
        */
        const newY = this.getY() + (flying ? 8 : -5)
        //A propriedade clientHeight é uma propriedade nativa existente em DOM, e retorna o valor total da altura de um elemento.
        const maxHeight = gameHeight - this.element.clientHeight

        //Se a altura atual do passaro for MENOR OU IGUAL a zero, a altura será zero. Isso faz com que o passaro não saia da tela.
        if (newY <= 0) {
            this.setY(0)
            //Se a altura atual do passaro foi MAIOR OU IGUAL a altura maxima ele se mantem na altura maxima, para que não saia da tela .   
        }else if(newY >= maxHeight){
            this.setY(maxHeight)
            //Caso não aconteça nenhuma das duas opções a altura segue atualizando normalmente de acordo com os botões pressionados.
        }else {
            this.setY(newY)
        }
    }

    //Faz com que a altura inicial seja no meio da tela.
    this.setY(gameHeight / 2)

}

//Função para contuação
function Progress() {
    //Criando o elemento span com classe progresso
    this.element = newElement('span', 'progresso')

    //Criando função que adiciona os pontos
    this.pointsUpdate = points => {
        this.element.innerHTML = points
    }

    //Atribuindo o valor de pontos inicial para 0
    this.pointsUpdate(0)
}

function areOverlapping(elementA, elementB) {
    const a = elementA.getBoundingClientRect()
    const b = elementB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top
    
    return horizontal && vertical
}

function collision(bird, barriers) {
    let collisionDetected = false

    barriers.pairs.forEach(pair => {
        const top = pair.top.element
        const bottom = pair.bottom.element

        if (areOverlapping(bird.element, top) || areOverlapping(bird.element, bottom)) {
            collisionDetected = true
        }
    })

    return collisionDetected
}

function FlappyBird() {
    let points = 0

    const gameArea = document.querySelector('[tp-flappy]')
    const height = gameArea.clientHeight
    const width = gameArea.clientWidth

    const progress = new Progress()
    const barriers = new Barriers(height, width, 200, 400,
    ()  => progress.pointsUpdate(++points))
    const bird = new Bird(height)

    gameArea.appendChild(progress.element)
    gameArea.appendChild(bird.element)

    barriers.pairs.forEach(pair => gameArea.appendChild(pair.element))

    this.start = () => {

        const temporizer = setInterval( () => {
            barriers.animation()
            bird.animation()

            if(collision(bird, barriers)) {
                clearInterval(temporizer)
            }
        }, 20)

        
    }
}
new FlappyBird().start()
