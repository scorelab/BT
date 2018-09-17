import React, { Component} from "react";
import { View, Text, Button, AsyncStorage} from "react-native";

export default class ProfileScreen extends Component {
    render() {
        return(
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text>Profile Screen</Text>

                <Button title="Sign Out" onPress={this._signOutAsync} />

            </View>
        )
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
}