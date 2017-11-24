function Fn () {
    this.name = 'zhangyan';
}
Fn.eat = () => {
    console.log('she like eating');
}
Fn.prototype.drink = () => {
    console.log('she like drinking cola');
}
module.exports = Fn;