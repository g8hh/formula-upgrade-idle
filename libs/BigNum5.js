

var notation = 1;
var PI = 3.14159265358;
var E = 2.71828182846;

function BigNum(num=0, power=0, shift=0, sign=1) {
	if (isNaN(num.num)) {
		this.num = num;
		this.power = power;
		this.shift = shift;
		this.sign = sign;
	}
	else {
		this.num = num.num;
		this.power = num.power;
		this.shift = num.shift;
		this.sign = num.sign;
	}
	b_normalize(this);
	b_normalize(this);
}


function big(number) {
	return new BigNum(number);
}


function b_plus(num1, num2) {
	if (isNaN(num1.num)) num1 = big(num1);
	if (isNaN(num2.num)) num2 = big(num2);
	if (num1.shift == 0 && num2.shift == 0) {
		if (num1.power == num2.power) {
			if (num1.sign == 1 && num2.sign == 1 || num1.sign == 0 && num2.sign == 0) {
				num1.num += num2.num;
			}
			else if (num1.sign == 1 && num2.sign == 0) {
				num1 = b_minus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
			}
			else if (num1.sign == 0 && num2.sign == 1) {
				num1 = b_minus(num2, new BigNum(num1.num, num1.power, num1.shift, 1));
			}
			return b_normalize(num1);
		}
		else if (num1.power > num2.power) {
			var maxPow = num1.power;
			var powDiff = num1.power - num2.power;
			num2.power = num1.power;
			num2.num /= Math.pow(10, powDiff);
			if (num1.sign == 1 && num2.sign == 1 || num1.sign == 0 && num2.sign == 0) {
				num1.num += num2.num;
			}
			else if (num1.sign == 1 && num2.sign == 0) {
				num1 = b_minus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
			}
			else if (num1.sign == 0 && num2.sign == 1) {
				num1 = b_minus(num2, new BigNum(num1.num, num1.power, num1.shift, 1));
			}
			return b_normalize(num1);
		}
		else if (num1.power < num2.power) {
			return b_plus(num2, num1);
		}
	}
	else if (num1.shift == 1 && num2.shift == 0) {
		if (num1.sign == num2.sign) {
			num2 = b_log10(num2);
			num2.shift = 1;
			var num1_t = new BigNum(num1.num, num1.power, 0, num1.sign);
			var num2_t = new BigNum(num2.num, num2.power, 0, num2.sign);
			
			var diff1 = new BigNum(num1.num, num1.power, 0, 1);
			var diff2 = new BigNum(num2.num, num2.power, 0, 1);
			
			num1_t = b_minus(num1_t, num2_t);
			num2_t = b_minus(num2_t, num2_t);

			if (gt(num1_t, 20)) {
				return num1;
			}
			else {
				num1_t = Math.pow(10, num1_t.num * Math.pow(10, num1_t.power));
				num2_t = Math.pow(10, num2_t.num * Math.pow(10, num2_t.power));
				
				var num_s;
				if (num1.sign == num2.sign && num1.sign == 1) {
					num_s = num1_t + num2_t;
					num_s = Math.log(num_s) / Math.log(10);
					num_s = b_plus(diff2, num_s);
					num_s.shift = 1;
					return b_normalize(num_s);
				}
				else if (num1.sign == num2.sign) {
					num_s = num1_t + num2_t;
					num_s = Math.log(num_s) / Math.log(10);
					num_s = b_plus(diff2, num_s);
					num_s.shift = 1;
					num_s.sign = 0;
					return b_normalize(num_s);
				}
			}
		}
		else if (num1.sign == 1 && num2.sign == 0) {
			return b_minus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
		}
		else if (num1.sign == 0 && num2.sign == 1) {
			return b_minus(num2, new BigNum(num1.num, num1.power, num1.shift, 1));
		}
	}
	else if (num1.shift == 0 && num2.shift == 1) {
		return b_plus(num2, num1);
	}
	else if (num1.shift == 1 && num2.shift == 1) {
		if (num1.sign == num2.sign) {
			if (gte(num1, num2)) {
			
				var num1_t = new BigNum(num1.num, num1.power, 0, num1.sign);
				var num2_t = new BigNum(num2.num, num2.power, 0, num2.sign);
				
				var diff1 = new BigNum(num1.num, num1.power, 0, 1);
				var diff2 = new BigNum(num2.num, num2.power, 0, 1);
				
				num1_t = b_minus(num1_t, num2_t);
				num2_t = b_minus(num2_t, num2_t);

				if (gt(num1_t, 20)) {
					return num1;
				}
				else if (lt(num1_t, -20)) {
					return num2;
				}
				else {
					num1_t = Math.pow(10, num1_t.num * Math.pow(10, num1_t.power));
					num2_t = Math.pow(10, num2_t.num * Math.pow(10, num2_t.power));
					
					var num_s;
					if (num1.sign == num2.sign && num1.sign == 1) {
						num_s = num1_t + num2_t;
						num_s = Math.log(num_s) / Math.log(10);
						num_s = b_plus(diff2, num_s);
						num_s.shift = 1;
						return b_normalize(num_s);
					}
					else if (num1.sign == num2.sign) {
						num_s = num1_t + num2_t;
						num_s = Math.log(num_s) / Math.log(10);
						num_s = b_plus(diff2, num_s);
						num_s.shift = 1;
						num_s.sign = 0;
						return b_normalize(num_s);
					}
				}
			}
			else {
				return b_plus(num2, num1);
			}
		}
		else if (num1.sign == 1 && num2.sign == 0) {
			return b_minus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
		}
		else if (num1.sign == 0 && num2.sign == 1) {
			return b_minus(num2, new BigNum(num1.num, num1.power, num1.shift, 1));
		}
	}
	else if (num1.shift > 1) {
		if (gt(b_abs(num1), b_abs(num2))) {
			return num1;
		}
		else {
			return num2;
		}
	}
	else if (num2.shift > 1) {
		if (gt(b_abs(num1), b_abs(num2))) {
			return num1;
		}
		else {
			return num2;
		}
	}
	return num1;
}


function b_minus(num1, num2) {
	if (isNaN(num1.num)) num1 = big(num1);
	if (isNaN(num2.num)) num2 = big(num2);
	if (num1.shift == 0 && num2.shift == 0) {
		if (num1.power == num2.power) {
			if (num1.sign == 1 && num2.sign == 1 || num1.sign == 0 && num2.sign == 0) {
				num1.num -= num2.num;
			}
			else if (num1.sign == 1 && num2.sign == 0) {
				num1 = b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
			}
			else if (num1.sign == 0 && num2.sign == 1) {
				num1 = b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 0));
			}
			return b_normalize(num1);
		}
		else if (num1.power > num2.power) {
			var maxPow = num1.power;
			var powDiff = num1.power - num2.power;
			num2.power = num1.power;
			num2.num /= Math.pow(10, powDiff);
			if (num1.sign == 1 && num2.sign == 1 || num1.sign == 0 && num2.sign == 0) {
				num1.num -= num2.num;
			}
			else if (num1.sign == 1 && num2.sign == 0) {
				num1 = b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
			}
			else if (num1.sign == 0 && num2.sign == 1) {
				num1 = b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 0));
			}
			return b_normalize(num1);
		}
		else if (num1.power < num2.power) {
			return b_inv(b_minus(num2, num1));
		}
	}
	else if (num1.shift == 1 && num2.shift == 0) {
		if (num1.sign == num2.sign) {
			num2 = b_log10(num2);
			num2.shift = 1;
			var num1_t = new BigNum(num1.num, num1.power, 0, num1.sign);
			var num2_t = new BigNum(num2.num, num2.power, 0, num2.sign);
			
			var diff1 = new BigNum(num1.num, num1.power, 0, 1);
			var diff2 = new BigNum(num2.num, num2.power, 0, 1);
			
			num1_t = b_minus(num1_t, num2_t);
			num2_t = b_minus(num2_t, num2_t);

			if (gt(num1_t, 20)) {
				return num1;
			}
			else {
				num1_t = Math.pow(10, num1_t.num * Math.pow(10, num1_t.power));
				num2_t = Math.pow(10, num2_t.num * Math.pow(10, num2_t.power));
				
				var num_s;
				if (num1.sign == num2.sign && num1.sign == 1) {
					num_s = num1_t - num2_t;
					num_s = Math.log(num_s) / Math.log(10);
					num_s = b_plus(diff2, num_s);
					num_s.shift = 1;
					return b_normalize(num_s);
				}
				else if (num1.sign == num2.sign) {
					num_s = num1_t - num2_t;
					num_s = Math.log(num_s) / Math.log(10);
					num_s = b_plus(diff2, num_s);
					num_s.shift = 1;
					num_s.sign = 0;
					return b_normalize(num_s);
				}
			}
		}
		else if (num1.sign == 1 && num2.sign == 0) {
			return b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
		}
		else if (num1.sign == 0 && num2.sign == 1) {
			return b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 0));
		}
	}
	else if (num1.shift == 1 && num2.shift == 1 && gt(num1, num2)) {
		if (num1.sign == num2.sign) {

			var num1_t = new BigNum(num1.num, num1.power, 0, num1.sign);
			var num2_t = new BigNum(num2.num, num2.power, 0, num2.sign);
			
			var diff1 = new BigNum(num1.num, num1.power, 0, 1);
			var diff2 = new BigNum(num2.num, num2.power, 0, 1);
			
			num1_t = b_minus(num1_t, num2_t);
			num2_t = b_minus(num2_t, num2_t);

			if (gt(num1_t, 20)) {
				return num1;
			}
			else {
				num1_t = Math.pow(10, num1_t.num * Math.pow(10, num1_t.power));
				num2_t = Math.pow(10, num2_t.num * Math.pow(10, num2_t.power));
				
				var num_s;
				if (num1.sign == num2.sign && num1.sign == 1) {
					num_s = num1_t - num2_t;
					num_s = Math.log(num_s) / Math.log(10);
					num_s = b_plus(diff2, num_s);
					num_s.shift = 1;
					return b_normalize(num_s);
				}
				else if (num1.sign == num2.sign) {
					num_s = num1_t - num2_t;
					num_s = Math.log(num_s) / Math.log(10);
					num_s = b_plus(diff2, num_s);
					num_s.shift = 1;
					num_s.sign = 0;
					return b_normalize(num_s);
				}
			}
		}
		else if (num1.sign == 1 && num2.sign == 0) {
			return b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 1));
		}
		else if (num1.sign == 0 && num2.sign == 1) {
			return b_plus(num1, new BigNum(num2.num, num2.power, num2.shift, 0));
		}
	}
	else if (num1.shift == 1 && num2.shift == 1 && gt(num2, num1)) {
		return b_inv(b_minus(num2, num1));
	}
	else if (num1.shift > 1) {
		if (gt(b_abs(num1), b_abs(num2))) {
			return num1;
		}
		else {
			return b_inv(num2);
		}
	}
	else if (num2.shift > 1) {
		if (gt(b_abs(num1), b_abs(num2))) {
			return num1;
		}
		else {
			return b_inv(num2);
		}
	}
	
	
	
	return num1;
}


function b_inv(num) {
	return new BigNum(num.num, num.power, num.shift, (num.sign+1)%2);
}



function b_abs(num) {
	return new BigNum(num.num, num.power, num.shift, 1);
}




function b_mult(num1, num2) {
	if (isNaN(num1.num)) num1 = big(num1);
	if (isNaN(num2.num)) num2 = big(num2);
	if (num1.shift == 0 && num2.shift == 0) {
		num1.power += num2.power;
		num1.num *= num2.num;
		if (num1.sign == num2.sign) {
			num1.sign = 1;
		}
		else {
			num1.sign = 0;
		}
		return b_normalize(num1);
	}
	else if (num1.shift == 1 && num2.shift == 0) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 0 && num2.shift == 1) {
		return b_mult(num2, num1);
	}
	else if (num1.shift == 1 && num2.shift == 1) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 2 && num2.shift == 1) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 2 && num2.shift == 2) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 1 && num2.shift == 2) {
		return b_mult(num2, num1);
	}
	else {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
}


function b_div(num1, num2) {
	if (isNaN(num1.num)) num1 = big(num1);
	if (isNaN(num2.num)) num2 = big(num2);
	if (num1.shift == 0 && num2.shift == 0) {
		num1.power -= num2.power;
		num1.num /= num2.num;
		if (num1.sign == num2.sign) {
			num1.sign = 1;
		}
		else {
			num1.sign = 0;
		}
		return b_normalize(num1);
	}
	else if (num1.shift == 1 && num2.shift == 0) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 0 && num2.shift == 1) {
		return b_div(num2, num1);
	}
	else if (num1.shift == 1 && num2.shift == 1) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		
		var res;
		if (num2.power < 0) {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 2 && num2.shift == 1) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 2 && num2.shift == 2) {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
	else if (num1.shift == 1 && num2.shift == 2) {
		return b_div(num2, num1);
	}
	else {
		var num2t = b_log10(num2);
		var num1t = b_log10(num1);
		var res;
		if (num2.power < 0) {
			res = b_plus(b_abs(num1t), b_abs(num2t));
		}
		else {
			res = b_minus(b_abs(num1t), b_abs(num2t));
		}
		res = shiftUP(res);
		if (num1.sign == num2.sign) {
			res.sign = 1;
		}
		else {
			res.sign = 0;
		}
		return b_normalize(res);
	}
}


function b_pow(num1, num2) {
	if (isNaN(num1.num)) num1 = big(num1);
	if (isNaN(num2.num)) num2 = big(num2);
	var num1t = b_log10(num1);
	var res = shiftUP(b_mult(num1t, num2));
	if (eq(num2, 0)) {
		return big(1);
	}
	else if (eq(num1, 0)) {
		return big(0);
	}
	else {
		return b_normalize(res);
	}
}

//double tetration
function b_tetrate2(num1) {
	if (isNaN(num1.num)) num1 = big(num1);
	var res = b_pow(num1, num1);
	return b_normalize(res);
}

//triple tetration
function b_tetrate3(num1) {
	if (isNaN(num1.num)) num1 = big(num1);
	var res = b_pow(num1, b_pow(num1, num1));
	return b_normalize(res);
}

//quadra tetration
function b_tetrate4(num1) {
	if (isNaN(num1.num)) num1 = big(num1);
	var res = b_pow(num1, b_pow(num1, b_pow(num1, num1)));
	return b_normalize(res);
}

//custom tetration
function b_tetrate(num1, num2) {
	if (isNaN(num1.num)) num1 = big(num1);
	
	var est = num2%1;
	var time = Math.floor(num2);
	var p = b_pow(num1, est);
	var res = b_pow(num1, p);
	for (var i = 1 ; i < time ; ++i) {
		res = b_pow(num1, res);
	}
	
	return b_normalize(res);
}

function b_log10(num) {
	if (isNaN(num.num)) num = big(num);
	if (num.shift == 0) {
		var pow = num.power;
		pow += Math.log(num.num) / Math.log(10);
		var newNum = new BigNum(pow, 0, 0, num.sign);
		return newNum;
	}
	else {
		var newNum = new BigNum(num.num, num.power, num.shift-1, num.sign);
		return newNum;
	}
}

function b_normalize(num) {
	
	if (num.num < 0 && num.shift == 0) {
		num.num = -num.num;
		num.sign += 1;
		num.sign %= 2;
		num = b_normalize(num);
	}
	if (num.num >= 10 || (num.num < 1 && num.num > 0)) {
		var powers = Math.floor(Math.log(num.num) / Math.log(10));
		var pow10 = Math.pow(10, powers);
		num.num /= pow10;
		num.power += powers;
	}
	if (num.num <= -10 || (num.num > -1 && num.num < 0)) {
		var powers = Math.floor(Math.log(Math.abs(num.num)) / Math.log(10));
		var pow10 = Math.pow(10, powers);
		num.num /= pow10;
		num.power += powers;
	}
	
	//grade up
	if (num.power >= 1000000) {
		var totPower = num.power + (Math.log(num.num) / Math.log(10));
		var newNum = new BigNum(totPower, 0, num.shift+1, num.sign);
		num.num = newNum.num;
		num.power = newNum.power;
		num.shift = newNum.shift;
		num.sign = newNum.sign;
	}
	
	var numBase;
	
	if (num.shift >= 1){
		numBase = new BigNum(num.num, num.power, 0, 1);
	}
	if (num.shift >= 1 && lt(numBase, 1000000) && num.num > 0) {
		var sign_ = (num.sign ? 1 : -1);
		var numnum = num.num * Math.pow(10, num.power);
		var numEst = numnum%1;
		numnum = Math.floor(numnum)* sign_;
		numEst = Math.pow(10, numEst);
		num.num = numEst;
		num.power = numnum;
		num.shift -= 1;
	}
	else 
	if (num.shift >= 1 && lt(numBase, 1000000) && gt(numBase, -1000000) && num.num <= 0) {
		var sign_ = (num.sign ? 1 : -1);
		var numnum = num.num * Math.pow(10, num.power);
		var numEst = numnum%1;
		numnum = Math.ceil(numnum)* sign_;
		numEst = Math.pow(10, numEst);
		num.num = numEst;
		num.power = numnum;
		num.shift -= 1;
	}
	if (num.num == 0 && (num.power != 0 || num.shift != 0 || num.sign != 1)) {
		num = new BigNum(0, 0, 0, 1);
	}
	
	return num;
}


function b_sqrt(num) {
	if (isNaN(num.num)) num = big(num);
	return b_pow(num, 0.5);
}



function b_fact(num) {
	if (isNaN(num.num)) num = big(num);
	var sti1 = b_mult(b_mult(2, PI), b_copy(num));
	sti1 = b_sqrt(b_copy(sti1));
	var sti2 = b_div(b_copy(num), E);
	sti2 = b_pow(b_copy(sti2), b_copy(num));
	var sti3_1 = big(1);
	var sti3_2 = b_div(1, b_mult(12, b_copy(num)));
	var sti3_3 = b_div(1, b_mult(188, b_pow(b_copy(num), 2)));
	var sti3_4 = b_div(139, b_mult(51840, b_pow(b_copy(num), 3)));
	var sti3_5 = b_div(571, b_mult(2488320, b_pow(b_copy(num), 4)));
	var sti3 = b_plus(sti3_1, sti3_2);
	sti3 = b_plus(sti3, sti3_3);
	sti3 = b_minus(sti3, sti3_4);
	sti3 = b_minus(sti3, sti3_5);
	sti3 = b_abs(sti3);
	var res;
	if (gt(num, 3)) {
		res = b_mult(b_mult(b_copy(sti1), b_copy(sti2)), b_copy(sti3));
	}
	else {
		if (num.num == 1) return big(1);
		else if (num.num == 2) return big(2);
		else if (num.num == 3) return big(6);
		else res = b_mult(b_mult(b_copy(sti1), b_copy(sti2)), 1.07);
	}
	return res;
}




function toNumber(num) {
	if (isNaN(num.num)) num = big(num);
	var signa = (num.sign ? 1 : -1);
	if (gt(b_abs(num), 1e300)) {
		return 1e300 * signa
	}
	else {
		var mant = num.num;
		var pow = num.power;
		return mant * Math.pow(10, pow) * signa;
	}
}


function b_sin(num) {
	if (isNaN(num.num)) num = big(num);
	if (lte(num, 1e300)) {
		return big(Math.sin(toNumber(num)));
	}
	else return big(0);
}

function b_cos(num) {
	if (isNaN(num.num)) num = big(num);
	if (lte(num, 1e300)) {
		return big(Math.cos(toNumber(num)));
	}
	else return big(1);
}

function b_tan(num) {
	if (isNaN(num.num)) num = big(num);
	if (lte(num, 1e300)) {
		return big(Math.tan(toNumber(num)));
	}
	else return big(0);
}


function b_exp(num) {
	if (isNaN(num.num)) num = big(num);
	return b_pow(E, num);
}

function b_10e(num) {
	if (isNaN(num.num)) num = big(num);
	return b_pow(10, num);
}


function b_sinh(num) {
	if (isNaN(num.num)) num = big(num);
	return b_div(b_minus(b_exp(num), b_exp(b_inv(num))), 2);
}

function b_cosh(num) {
	if (isNaN(num.num)) num = big(num);
	return b_div(b_plus(b_exp(num), b_exp(b_inv(num))), 2);
}

function b_tanh(num) {
	if (isNaN(num.num)) num = big(num);
	return b_div(b_sinh(num), b_cosh(num));
}


function shiftUP(num) {
	if (num.shift >= 1) {
		return new BigNum(num.num, num.power, num.shift+1, num.sign);
	}
	else {
		var sign_ = (num.sign ? 1 : -1);
		return new BigNum(num.num*sign_, num.power, num.shift+1, 1);
	}
}

function shiftDown(num) {
	return new BigNum(num.num, num.power, num.shift-1, num.sign);
}

function b_copy(num) {
	return new BigNum(num.num, num.power, num.shift, num.sign);
}


var a = 4;
var a = new BigNum(1, 1200000, 0, 0);
var b = new BigNum(1, 1000000, 0, 1);





function fromStr(str) {
	var sign = 1;
	var shift = 0;
	var num = 0;
	var power = 0;
	
	var wasNum = false;
	var wasPow = false;
	var wasPoint = false;
	var pointS = 1;
	
	if (str[0] == '-') {
		sign = 0;
	}
	for (var i = 0 ; i < str.length ; ++i) {
		if (str[i] == 'e' && !wasNum) {
			shift += 1;
		}
		if (str[i] >= '0' && str[i] <= '9' && !wasPow && !wasPoint) {
			wasNum = true;
			num *= 10;
			num += (str[i] - '0');
		}
		if (str[i] == 'e' && wasNum) {
			wasPow = true
		}
		if (str[i] == '.' && !wasPow) {
			wasPoint = true;
		}
		if (str[i] >= '0' && str[i] <= '9' && !wasPow && wasPoint) {
			num += (str[i] - '0') * Math.pow(0.1, pointS);
			pointS += 1;
		}
		if (str[i] >= '0' && str[i] <= '9' && wasPow) {
			power *= 10;
			power += (str[i] - '0');
		}
	}
	return new BigNum(num, power, shift, sign);
}




console.log(format(fromStr("eeeeeeeeeeee9.9999")));






function format(b) {
	var string = "";
	if (b.sign == 0) {
		string += "-";
	}
	if (b.shift < 6) {
		for (var i = 0 ; i < b.shift ; ++i) {
			string += "e";
		}
	}
	else {
		string += "(" + b.shift + "e)";
	}
	if (b.power < 10) {
		var num = b.num * Math.pow(10, b.power);
		string += Math.round(num*100000)/100000;
	}
	else {
		string += Math.round(b.num*100000)/100000;
		string += "e";
		string += Math.round(b.power);
	}
	return string;
}



function format2(b) {
	var string = "";
	if (b.sign == 0) {
		string += "-";
	}
	if (b.shift < 6) {
		for (var i = 0 ; i < b.shift ; ++i) {
			string += "e";
		}
	}
	else {
		string += "(" + b.shift + "e)";
	}
	if (b.power < 6) {
		var num = b.num * Math.pow(10, b.power);
		string += Math.round(num*100)/100;
	}
	else {
		string += Math.round(b.num*100)/100;
		string += "e";
		string += Math.round(b.power);
	}
	return string;
}


//lt (<) lte (<=)
//gt (>) gte (>=)
//eq (==) neq (!=)

function gt(a, b) {
	if (isNaN(a.num)) a = big(a);
	if (isNaN(b.num)) b = big(b);
	if (a.sign == 1 && b.sign == 1) {
		if (a.shift > b.shift) {
			return true;
		}
		else if (a.shift == b.shift) {
			if (a.power > b.power && a.num != 0) {
				return true;
			}
			else if (a.num == 0) {
				return false;
			}
			else if (b.num == 0) {
				return true;
			}
			else if (a.power == b.power) {
				if (a.num > b.num) {
					return true;
				}
				else return false;
			}
			else return false;
		}
		else return false;
	}
	else if (a.sign == 1 && b.sign == 0) {
		return true;
	}
	else if (a.sign == 0 && b.sign == 1) {
		return false;
	}
	else {
		if (a.shift > b.shift) {
			return false;
		}
		else if (a.shift == b.shift) {
			if (a.power > b.power) {
				return false;
			}
			else if (a.power == b.power) {
				if (a.num >= b.num) {
					return false;
				}
				else return true;
			}
			else return true;
		}
		else return true;
	}
}

function eq(a, b) {
	if (isNaN(a.num)) a = big(a);
	if (isNaN(b.num)) b = big(b);
	if (a.shift == b.shift) {
		if (a.power == b.power) {
			if (a.num == b.num) {
				return true;
			}
			else return false;
		}
		else return false;
	}
	else return false;
}

function gte(a, b) {
	if (isNaN(a.num)) a = big(a);
	if (isNaN(b.num)) b = big(b);
	if (gt(a, b) || eq(a, b)) {
		return true;
	}
	else {
		return false;
	}
}

function lt(a, b) {
	if (isNaN(a.num)) a = big(a);
	if (isNaN(b.num)) b = big(b);
	if (!gte(a, b)) {
		return true;
	}
	else {
		return false;
	}
}

function lte(a, b) {
	if (isNaN(a.num)) a = big(a);
	if (isNaN(b.num)) b = big(b);
	if (lt(a, b) || eq(a, b)) {
		return true;
	}
	else {
		return false;
	}
}

function neq(a, b) {
	if (isNaN(a.num)) a = big(a);
	if (isNaN(b.num)) b = big(b);
	if (!eq(a, b)) {
		return true;
	}
	else return false;
}