class Calculator {
    constructor(curr, prev){
        this.curr = curr
        this.prev = prev
        this.clearAll()
    }

    clearAll(){
        this.result = 0
        this.prev_val = ''
        this.curr_val = ''
        this.prev_op = undefined
        this.updateDisplay(this.curr_val, this.prev_val)
    }

    clearCurr(){
        this.curr_val = ''
        this.updateDisplay(this.curr_val, this.prev_val)
    }

    delete(){
        this.curr_val = this.curr_val.toString().slice(0,-1)
        this.updateDisplay(this.curr_val, this.prev_val)
    }

    appendCurr(num){
        this.curr_val = this.curr_val.toString()
        num = num.toString()

        if(this.curr_val === '' || this.curr_val === '0'){
            if(num === '.') this.curr_val = '0.'
            else if(num !== '0') this.curr_val = num
            else this.curr_val = '0'
        } else if(!(num === '.' && this.curr_val.includes('.')))
            this.curr_val = this.curr_val + num

        this.updateDisplay(this.curr_val, this.prev_val)
    }
    
    appendPrev(op){
        if(this.curr_val === '') return

        if(this.prev_val === ''){
            this.result = this.curr_val
            this.prev_val = this.curr_val + ' ' + op
        } else{
            this.prev_val = this.prev_val + ' ' + this.curr_val + ' ' + op
        }
        
        this.calculate()
        this.prev_op = op
        this.curr_val = ''
        this.updateDisplay(this.curr_val, this.prev_val)
        // this.updateDisplay(this.result, this.prev_val)
    }

    calculate(){
        this.result = parseFloat(this.result)
        let curr_num = parseFloat(this.curr_val)

        switch (this.prev_op){
            case '+': 
                this.result = this.result + curr_num
                break
            case '-': 
                this.result = this.result - curr_num
                break
            case '*': 
                this.result = this.result * curr_num
                break
            case '/': 
                this.result = this.result / curr_num
                break
            default:
                return
        }
    }

    equals(){
        this.appendPrev(undefined)
        let temp = this.result
        this.clearAll()
        this.curr_val = temp
        this.updateDisplay(this.curr_val, this.prev_val)
    }

    updateDisplay(curr, prev){
        // curr = curr.toLocaleString('en', { maximumFractionDigits: 0 })
        this.curr.innerText = curr
        this.prev.innerText = prev
    }
}

// const
const num = document.querySelectorAll('[btn-num]')
const op = document.querySelectorAll('[btn-op]')
const dec = document.querySelectorAll('[btn-dec]')
const eq = document.querySelector('[btn-eq]')
const c = document.querySelector('[btn-c]')
const ce = document.querySelector('[btn-ce]')
const del = document.querySelector('[btn-del]')
const prev = document.querySelector('[dis-prev]')
const curr = document.querySelector('[dis-curr]')

const calculator = new Calculator(curr, prev)

// event listener
num.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.innerText)
        calculator.appendCurr(btn.innerText)
    })
})

op.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.innerText)
        calculator.appendPrev(btn.innerText)
    })
})

dec.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('dec')
        calculator.appendCurr(btn.innerText)
    })
})

eq.addEventListener('click', btn => {
    console.log('eq')
    calculator.equals()
})

c.addEventListener('click', btn => {
    console.log('c')
    calculator.clearAll()
    
})

ce.addEventListener('click', btn => {
    console.log('ce')
    calculator.clearCurr()
})

del.addEventListener('click', btn => {
    console.log('del')
    calculator.delete()
})
