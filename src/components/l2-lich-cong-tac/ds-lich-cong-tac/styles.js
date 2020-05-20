
const React = require('react-native');
import { scale, verticalScale, moderateScale } from '../../user-controls/utilities/Scale'
const { StyleSheet } = React;
export default {
    container: {
        backgroundColor: '#DADADA',
    },
    titleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8
    },
    btnTitle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitleHeader: {
        fontSize: 14,
    },
    textTitle: {
        fontSize: 14,
        backgroundColor: '#dadada',
        color: '#666666',
        padding: 8,
        paddingLeft: 16
    },
    itemStyle: {
        backgroundColor: '#FFFFFF',
        height: 100,
        margin: 5,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        padding: 10,

    },
    line: {
        backgroundColor: '#eaeaea',
        flex: 1,
        height: 1
    },
    buttonIcon: {
        width: 48,
        height: 48,
    },
    itemSchedule: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 8
    },
    itemScheduleTime: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    itemScheduleContent: {
        flex: 4
    },
    itemScheduleBtn: {
        flex: 1,
        alignItems: 'center'
    }, inputModal: {
        borderColor: '#b4b4b4',
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 8,
        borderWidth: 1
    }, border: {
        borderColor: '#b4b4b4',
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 8,
        borderWidth: 1
    }, item: {
        backgroundColor: '#7fae7e',
        flex: 1,
        width:"85%",
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
};
