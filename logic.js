class Calculadora {

    constructor(){
        this.display = '';
    }

    writeToDisplay(n) {
        if(n === '.'){
            if(this.display.includes('.')){   // para que no ponga mas de un punto
                return;
            }
        }
        
        if(n === '0' && this.display === ''){
            return;
        }

        this.display += n;
        document.getElementById('displayBox').value = this.display;
    };

    writeOperatorToDisplay(o){
        this.display += o;
        document.getElementById('displayBox').value = this.display;
    } 

    toggleSign(){
        this.display = '(-1)*'+this.display;
        document.getElementById('displayBox').value = this.display;
    }
    
    clearDisplay(){
        this.display = '';
        document.getElementById('displayBox').value = this.display;
    }

    eraseLastInput(){
        if(this.display.length > 0 ){
            this.display = this.display.substr(0, this.display.length - 1);
            document.getElementById('displayBox').value = this.display;
        }
    }

    solveOperation(){
        this.display = eval(this.display);
        document.getElementById('displayBox').value = this.display;
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
        document.getElementById('displayBox').value = this.display;
    }
    
    square(){
        this.display = Math.pow(this.display, 2);
        document.getElementById('displayBox').value = this.display;
    }

    cube(){
        this.display = Math.pow(this.display, 3);
        document.getElementById('displayBox').value = this.display;
    }

    inverseNumber(){
        this.display = Math.pow(this.display, -1);
        document.getElementById('displayBox').value = this.display;
    }

    calculateFactorial(){
        this.display = this.factorial(this.display);
        document.getElementById('displayBox').value = this.display;
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
let calculadora = new CalculadoraCientifica();