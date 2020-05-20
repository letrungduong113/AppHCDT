import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar, defaultStyle,LocaleConfig } from 'react-native-calendars'
import moment from 'moment'
const XDate = require('xdate');

type Props = {
  initialRange: React.PropTypes.array.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
};
LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.locales.vn = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
  ],
  dayNames: [
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
    'CN',
  ],
  dayNamesShort: [
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'CN',
  ],
};
LocaleConfig.defaultLocale = 'vn';
export default class DateRangePicker extends Component<Props> {
  constructor(props){
      super(props);
      const date= moment().add(1,'day').format('YYYY-MM-DD');
      markedDates={
          [date]:{startingDay: true,endingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          }
      
      this.state={
          isFromDatePicked: false, 
          isToDatePicked: false, 
          markedDates
    }
    this.props.onSuccess(date, date)
  }
  componentDidMount() { 
        this.setupInitialRange() 

    }

  onDayPress = (day) => {
    if (!this.state.isFromDatePicked || (this.state.isFromDatePicked && this.state.isToDatePicked)) {
      this.setupStartMarker(day)
      this.props.onSuccess(day.dateString, day.dateString)
    } else if (!this.state.isToDatePicked) {
      let markedDates = {...this.state.markedDates}
      let [mMarkedDates, range] = this.setupMarkedDates(this.state.fromDate, day.dateString, markedDates)
      if (range >= 0) {
        this.setState({isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates})
        this.props.onSuccess(this.state.fromDate, day.dateString)
      } else {
        this.setupStartMarker(day)
      }
    }

  }

  setupStartMarker = (day) => {
    let markedDates = {[day.dateString]: {startingDay: true,endingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    this.setState({isFromDatePicked: true, isToDatePicked: false, fromDate: day.dateString, markedDates: markedDates})
  }

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    markedDates[mFromDate.toString('yyyy-MM-dd')] = {startingDay: true,endingDay: false, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
    if (range >= 0) {
      if (range == 0) {
        markedDates = {[toDate]: {color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if (i < range) {
            markedDates[tempDate] = {color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          } else {
            markedDates[tempDate] = {endingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          }
        }
      }
    }
    return [markedDates, range]
  }

  setupInitialRange = () => {
    if (!this.props.initialRange) return
    let [fromDate, toDate] = this.props.initialRange
    let markedDates = {[fromDate]: {startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    let [mMarkedDates, range] = this.setupMarkedDates(fromDate, toDate, markedDates)
    this.setState({markedDates: mMarkedDates, fromDate: fromDate})
  }

  render() {
    return (
      <Calendar {...this.props}
                markingType={'period'}
                current={this.state.fromDate}
                markedDates={this.state.markedDates}
                onDayPress={(day) => {this.onDayPress(day)}}/>
    )
  }
}

DateRangePicker.defaultProps = {
  theme: { markColor: '#e50f17', markTextColor: 'white',
    'stylesheet.day.period': {
        base: {
        overflow: 'hidden',
        height: 34,
        alignItems: 'center',
        width: 38,
        }
    },
 }
};