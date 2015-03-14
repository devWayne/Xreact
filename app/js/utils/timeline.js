function Timeline(_date, _nowDate) {

    if (!_nowDate) _nowDate = new Date();

    var _dateTime = new Date(_date).getTime(),
        _nowTime = _nowDate.getTime();

    var deltaTime = _nowTime - _dateTime;
    if (deltaTime < 0) return false;


    var MINUTES30 = 1000 * 60 * 30,
        MINUTES60 = HOUR = MINUTES30 * 2,
        MINUTES90 = MINUTES30 * 3,
        MINUTES120 = HOURS2 = MINUTES30 * 4,
        MINUTES150 = MINUTES30 * 5,
        HOURS3 = MINUTES180 = HOUR * 3,
        HOURS24 = HOUR * 24;



    var tDateTime = getTodayTime(_date);

    var deltaTodayTime = _dateTime - tDateTime;

    var deltaTodayTimePLUS24HS = deltaTodayTime + HOURS24;


    if (deltaTime <= HOURS3) {
        var _delta1 = HOURS3 - deltaTime;
        if (_delta1 < MINUTES30) {
            return _date.getMinutes() + '分钟前';
        } else if (_delta1 < MINUTES60) {
            return '半小时前';
        } else if (_delta1 < MINUTES90) {
            return '1小时前';
        } else if (_delta1 < MINUTES120) {
            return '1小时前';
        } else if (_delta1 < MINUTES150) {
            return '2小时前';
        } else if (_delta1 < MINUTES180) {
            return '3小时前';
        }
    } else if (deltaTime <= deltaTodayTime) {
        return _date.getHours() + ':' + _date.getMinutes();
    } else if (deltaTime <= deltaTodayTimePLUS24HS) {
        return '昨天';
    } else {
        return _date.getMonth() + 1 + '月' + _date.getDate() + '日';
    }

    function getTodayTime(_tDateTime) {
        _tDate = new Date(_tDateTime);
        _tDate.setHours(0);
        _tDate.setMinutes(0);
        _tDate.setSeconds(0);
        var _tDateTime = _tDate.getTime();
        return _tDateTime;
    }

}

module.exports = Timeline;

