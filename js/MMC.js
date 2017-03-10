// *********************************************
// ****    MolecularMassCounter Ver.1.10    ****
// *********************************************

// ** Update **
// v 1.11 hotfix
//
// v 1.10
//    - 模組化
//    - 封裝
// v 1.01
//    - 修正單元素問題

function molecularMassCounter( source ){

    //元素週期表
    var periodicTable = {
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

    //正規表示式區
    //*分割元素
    var regExp_GetElement = /[A-Z][a-z]{0,2}\d*/g;
    //*取得元素名稱和底下之數量
    var regExp_GetElementNameAndHowMuchElement =/[A-Z][A-Z]{0,2}/;
    //*切割重複的分子式
    var regExp_GetFormula = /(\([\w\d^)]*\)\d)/g;
    //*取得重複分子式的基數
    var regExp_GetHowMuchFormula = /\)/;

    //函式區
    //計算單元素分子量
    function getElementMass( elementName ){
        return periodicTable[ elementName ];
    }

    //計算同種元素分子量
    function getSameElementMass( src ){
        var elementName, howMuchSameElement, tmp_RegExpSplit;
        
        tmp_RegExpSplit = src.match( regExp_GetElementNameAndHowMuchElement );
        elementName = tmp_RegExpSplit[ 0 ];
        tmp_RegExpSplit = src.split( regExp_GetElementNameAndHowMuchElement );
        howMuchSameElement = tmp_RegExpSplit[ 1 ] || 1;

        return getElementMass( elementName ) * howMuchSameElement;
    }

    //切割出單種元素
    function splitElement( src ){
        return src.match( regExp_GetElement );
    }

    //計算單層分子式(無括號)
    function getOneLevelFormulaMass( src ){
        var elements, howMuchElements, sumMass = 0;

        elements = splitElement( src );
        howMuchElements = elements.length;

        for( var p = 0; p < howMuchElements ; p++ ){
            sumMass += getSameElementMass( elements[ p ] );
        }
        return sumMass;
    }

    //計算二層分子式
    function getTwoLevelFormulaMass( src ){
        var tmpFormula, formulaLength, sumMass = 0;
        
        formulaLength = src.length;
        
        for( var p = 0; p < formulaLength; p++ ){
            tmpFormula = src[ p ].split( regExp_GetHowMuchFormula );
            sumMass += ( getOneLevelFormulaMass( tmpFormula[ 0 ] ) * tmpFormula[ tmpFormula.length - 1 ] );
        }
        
        return sumMass;
    }

    //主程式碼
    function main( src ){
        var tmpFormula, sumMass = 0;
        
        tmpFormula = src.match( regExp_GetFormula );
        
        if( tmpFormula !== null ){
            sumMass += getTwoLevelFormulaMass( tmpFormula );
        }
        tmpFormula = src.replace( regExp_GetFormula , "" );
        sumMass += getOneLevelFormulaMass( tmpFormula );
        
        return sumMass > 0 ? sumMass : "含有不存在元素";
    }
    
    return main( source );

}