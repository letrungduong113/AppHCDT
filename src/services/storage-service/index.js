import React from "react";
import { AsyncStorage } from "react-native";


class StorageService {
  
  static userLevel = 0;
  setUserlevel(level) {
    this.userLevel = level;
  }

  getUserlevel() { return this.userLevel};

  async saveValue(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  }
  
  async loadValue(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        //console.log(value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
      return null;
    }
  }
  async removeValue(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Error saving data
    }
  }
}

export default new StorageService;