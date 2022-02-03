const Order = require("./assignment1Order");

const sandwich = 10;
const multigrain = 8;
const size = 2.5;
const toppings = 4;
const drinks = 2;
const tax = .13;


const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    TYPE: Symbol("type"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    ORDERDRINKS:   Symbol("orderdrinks"),
    SECOND_ITEM: Symbol("second")
});

module.exports = class SandwichOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sItem = "";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem2 = "";
        this.sPrice = 0;
        this.sTax =0;
        this.sTotalamount = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.TYPE;
                aReturn.push("Welcome to Karampreet's Sub Store.");
                aReturn.push("What meal type of sandwich bread would you like: \n 1. sandwich or \n2. multigrain ");
                break;
            case OrderState.TYPE:
                this.stateCur = OrderState.SIZE
                this.sItem = sInput;
                if (this.sItem.toLocaleLowerCase() == "sandwich") {
                    this.sPrice += sandwich;
                }
                if (this.sItem.toLocaleLowerCase() == "multigrain") {
                    this.sPrice += multigrain;
                }
                aReturn.push("What size would you like? \nsmall \nmedium \nlarge");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                this.sPrice += size;
                aReturn.push("What toppings would you like ?");
                break;

            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sPrice += toppings;
                this.sToppings = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                if(sInput.toLowerCase() == "yes") {
                    aReturn.push("What drinks would you like to have?");
                    this.stateCur = OrderState.ORDERDRINKS
                    break;
                }
                else if (sInput.toLowerCase() == "no") {
                    this.sDrinks = "without any drinks";
                    this.stateCur = OrderState.SECOND_ITEM
                    aReturn.push("Do you have any additional order?");
                } 
                break;
            
            case OrderState.ORDERDRINKS:
                this.sDrinks = `and a drink of ${sInput}`;
                this.sPrice += drinks;
                this.stateCur = OrderState.SECOND_ITEM
                aReturn.push("Do you have any additional order?")
                break;

            case OrderState.SECOND_ITEM:
                switch(sInput) {
                    case 'no':
                        this.isDone(true);
                        aReturn.push("Thank you for your order of");
                        aReturn.push(`${this.sSize} ${this.sItem} with a toppings of ${this.sToppings} ${this.sDrinks} `);
                        aReturn.push(this.sItem2)

                        this.sTax = this.sPrice * tax;
                        this.totalamount =  this.sPrice + this.sTax;

                        aReturn.push(`Your order is \n amount $${this.sPrice} \n HST $${this.sTax.toFixed(2)} \n Total amount: $${this.totalamount.toFixed(2)}`);

                        let d = new Date(); 
                        d.setMinutes(d.getMinutes() + 20);
                        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                        break;
                    case 'yes':
                        aReturn.push("Please type 'YES'to confirm")
                        this.sItem2 = `${this.sSize} ${this.sItem} with a toppings of ${this.sToppings} ${this.sDrinks}`
                        this.stateCur = OrderState.WELCOMING
                        break;
                }
                break;
        } 
        return aReturn;
    }
}