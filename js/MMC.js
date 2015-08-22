// *********************************************
// ****    MolecularMassCounter Ver.1.01    ****
// *********************************************

// ** Update **
// v 1.01
//    - 修正單元素問題

var PeriodicTable = {
    "H"  : 1.008 ,                                                                                                                                                                                                                                                 "He" : 4.003 , 
    "Li" : 6.941 , "Be" : 9.012 ,                                                                                                                                                       "B"  : 10.81 , "C"  : 12.01 , "N"  : 14.01 , "O"  : 16.00 , "F"  : 19.00 , "Ne" : 20.18 , 
    "Na" : 22.99 , "Mg" : 24.31 ,                                                                                                                                                       "Al" : 26.98 , "Si" : 28.09 , "P"  : 30.97 , "S"  : 32.07 , "Cl" : 35.45 , "Ar" : 39.95 , 
    "K"  : 39.10 , "Ca" : 40.08 , "Sc" : 44.96 , "Ti" : 47.88 , "V"  : 50.94 , "Cr" : 52.00 , "Mn" : 54.94 , "Fe" : 55.85 , "Co" : 58.93 , "Ni" : 58.69 , "Cu" : 63.55 , "Zn" : 65.39 , "Ga" : 69.72 , "Ge" : 72.59 , "As" : 74.92 , "Se" : 78.96 , "Br" : 79.90 , "Kr" : 83.80 , 
    "Rb" : 85.47 , "Sr" : 87.62 , "Y"  : 88.91 , "Zr" : 91.22 , "Nb" : 92.91 , "Mo" : 95.94 , "Tc" : 97.91 , "Ru" : 101.1 , "Rh" : 102.9 , "Pd" : 106.4 , "Ag" : 107.9 , "Cd" : 112.4 , "In" : 114.8 , "Sn" : 118.7 , "Sb" : 121.8 , "Te" : 127.6 , "I"  : 126.7 , "Xe" : 131.3 , 
    "Cs" : 132.9 , "Ba" : 137.3 ,                "Hf" : 178.5 , "Ta" : 180.9 , "W"  : 183.9 , "Re" : 186.2 , "Os" : 190.2 , "Ir" : 192.2 , "Pt" : 195.1 , "Au" : 197.0 , "Hg" : 200.6 , "Tl" : 204.4 , "Pb" : 207.2 , "Bi" : 209.0 , "Po" : 209.0 , "At" : 210.0 , "Rn" : 222.0 , 
    "Fr" : 223.0 , "Ra" : 226.0 ,                "Rf" : 265.1 , "Db" : 268.1 , "Sg" : 271.1 , "Bh" : 270.1 , "Hs" : 277.2 , "Mt" : 276.2 , "Ds" : 281.2 , "Rg" : 280.2 , "Cn" : 285.2 , "Uut": 284.2 , "Fl" : 289.2 , "Uup": 288.2 , "Lv" : 293.2 , "Uus": 294.2 , "Uuo": 294.2 , 
    
                                  "La" : 138.9 , "Ce" : 140.1 , "Pr" : 140.9 , "Nd" : 144.2 , "Pm" : 144.9 , "Sm" : 150.4 , "Eu" : 152.0 , "Gd" : 157.3 , "Tb" : 158.9 , "Dy" : 162.5 , "Ho" : 164.9 , "Er" : 167.3 , "Tm" : 168.9 , "Lu" : 175.0 , 
                                  "Ac" : 227.0 , "Th" : 232.0 , "Pa" : 231.0 , "U"  : 238.0 , "Np" : 237.1 , "Pu" : 244.1 , "Am" : 243.1 , "Cm" : 247.1 , "Bk" : 247.1 , "Cf" : 252.1 , "Es" : 252.1 , "Md" : 258.1 , "No" : 259.1 , "Lr" : 262.1 
};
var RegL1 = /[A-Z][a-z]{0,2}\d*/g;
var RegL2 = /(\([\w\d^)]*\)\d)/g; 
var RegLC = /\)/;
var m, n;
 
function Counter(s){
    var tmp = 0, x, y, z;
    console.log(s);
    z = s.match(RegL1);
    for (var i = 0; i < z.length ; i++){
        x = z[i].match(/[A-Z][a-z]{0,2}/);
        y = (( z[i].split(/[A-Z][a-z]{0,2}/)[1] > 0 ) ? z[i].split(/[A-Z][a-z]{0,2}/)[1] : 1);
    	tmp += (PeriodicTable[x]*y);
        //console.log(x + ", " + y + ", " + tmp);
    }
    return tmp;
}

function LevelCount(s){
    var tmp, x = 0;
    for( var i = 0 ; i < s.length ; i++ ){
    	tmp = s[i].split(RegLC);
        //console.log(tmp);
		x += (Counter(tmp[0]) * tmp[tmp.length - 1]);
    }
    return x;
}

function main(s){
    var tmp, x = 0;
	if ((tmp = s.match(RegL2)) !== null) {
		x += LevelCount(tmp);
		//console.log(x);
    }
    x += Counter(s.replace(RegL2, ""));
		//console.log(x);
    return x;
}
console.log(main("C6H12O6"));