class Calculadora {
    constructor(){
        this.display = '';
        this.memory = 0;
    }

    writeToDisplay(n) {
        if(n === '.'){
            if(this.display.includes('.')){   // para que no ponga mas de un punto
                return;
            }
        }
        
        if(n === '0' && this.display === '0'){
            return;
        }

        if(this.display === 'error'){
            this.display = '';
        }

        this.display += n;
    };

    set display(valor){
        document.getElementById('displayBox').value = valor;
        this._display = valor;
    }
    get display(){
        this._display = document.getElementById('displayBox').value;
        return this._display;
    }


    writeOperatorToDisplay(o){
        this.display += o;
    } 

    toggleSign(){
        if(!this.isError()){
            if(this.display.charAt(0) === '-'){
                this.display = this.display.slice(1);
            }else{
                this.display = '-' + this.display;
            }
        }
    }
    
    clearDisplay(){
        this.display = '';
    }

    eraseLastInput(){
        if(this.display.length > 0 ){
            this.display = this.display.slice(0,-1);
        }
    }

    solveOperation(){
        try{
            this.display = eval(this.display);
        }catch(e){
            console.error(e);
            this.display = 'error';
        }
    }

    //-- Memory --//
    clearMemory(){
        this.memory = 0;
    }
    readMemory(){
        this.display = this.memory;
    }
    addToMemory(){
        this.solveOperation();
        if(!this.isError()){
            this.memory += Number(this.display);
            this.display = this.memory;
        }
    }
    subtractFromMemory(){
        this.solveOperation();
        if(!this.isError()){
            this.memory -= Number(this.display);
            this.display = this.memory;
        }

    }
    saveToMemory(){
        this.solveOperation();
        if(!this.isError()){
            this.memory = Number(this.display);
        }
        this.clearDisplay();
    }

    isError(){
        return this.display === 'error';
    }
}

class CalculadoraCientifica extends Calculadora{
    constructor(){
        super();
    }

    writeMathFunction(mathFunc){
        switch(mathFunc){
            case 'sin(':
                this.display = Math.sin(this.display);
                break;
            case 'cos(':
                this.display = Math.cos(this.display);
                break;
            case 'tan(':
                this.display = Math.tan(this.display);
                break;
            case 'sqrt(':
                this.display = Math.sqrt(this.display);
                break;
            case 'log(':
                this.display = Math.log(this.display);
                break;
            case 'ln(':
                this.display = Math.LN10(this.display);
                break;
            case 'e':
                if(this.includesOperator()){
                    this.display += Math.E;
                }else console.warn(`No se puede agregar ${mathFunc} porque no hay un operador.`);
                break;
            case 'PI':
                if(this.includesOperator()){
                    this.display += Math.PI;
                }else console.warn(`No se puede agregar ${mathFunc} porque no hay un operador.`);
                break;
            default:
                console.error(`Operación ${mathFunc} no soportada`);
        }
    }
    
    square(){
        this.display = Math.pow(this.display, 2);
    }

    cube(){
        this.display = Math.pow(this.display, 3);
    }

    inverseNumber(){
        this.display = Math.pow(this.display, -1);
    }

    calculateFactorial(){
        this.display = this.factorial(this.display);
    }

    factorial(n){
        if(n == 0 || n == 1){
            return 1;
        }else{
            return n * this.factorial( n-1 );
        }
    }

    includesOperator(){
        return this.display === '' || '+-*/'.includes(this.display.charAt(this.display.length - 1));
    }
}

const calculadora = new CalculadoraCientifica();