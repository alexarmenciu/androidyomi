import { Text } from 'react-native';
import React from 'react';

export default function GetLinkedText(props) {
    /*console.log(props.wordlist);
    console.log(props.func);
    console.log(typeof props.func);
    props.func("abacus")
    */
    var textlist = [];
    for (let i = 0; i < props.wordlist.length; i++) {
        textlist.push(React.createElement(Text, { onPress: () => { props.func(props.wordlist[i]) }, key: i }, props.wordlist[i]));
    }

    var textElem = React.createElement(Text, {}, textlist);

    /*return textElem*/
    return textElem;
}