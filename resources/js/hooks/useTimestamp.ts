import {
    format,
    addMonths,
    endOfMonth,
    startOfMonth,
    addYears,
    getUnixTime,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default function useTimestamp() {
    const getSafeDateTime = (timestamp: string) => {
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        return regex.exec(timestamp);
    };

    const getDateObject = (timestamp = '') => {
        if (!timestamp.trim().length) {
            return new Date();
        }

        // @ts-ignore
        const [full, year, month, day, hours, minutes, seconds] = getSafeDateTime(timestamp);
        return new Date(year, month, day, hours, minutes, seconds);
    };

    const formatDate = (
        pattern = 'yyyy-MM-dd hh:mm A',
        timestamp = ''
    ): string => {
        return format(getDateObject(timestamp), pattern);
    };

    const formatTimeZone = (
        pattern = 'yyyy-MM-dd hh:mm',
        zone = 'UTC',
        timestamp = ''
    ) => {
        const zonedDate = utcToZonedTime(getDateObject(timestamp), zone);
        return formatDate(pattern, zonedDate.toLocaleString());
    };

    const addMonth = (addition: number, timestamp = '') => {
        return addMonths(getDateObject(timestamp), addition);
    };

    const addYear = (addition: number, timestamp = '') => {
        return addYears(getDateObject(timestamp), addition);
    };

    const setDoubleDigits = (int: number): string => {
        if (int < 10) {
            return '0' + int;
        }

        return int.toString();
    };

    const getEndDayOfMonth = (timestamp = '') => {
        return endOfMonth(getDateObject(timestamp));
    };

    const getStartDayOfMonth = (timestamp = '') => {
        return startOfMonth(getDateObject(timestamp));
    };

    const unix = (timestamp = ''): number => {
        return getUnixTime(getDateObject(timestamp));
    };

    const generateUnixId = (): number => {
        return unix() * Math.round(Math.random() * 100) + 1;
    };

    const generateTempId = (): string => {
        return 'temp_' + generateUnixId();
    };

    const isTempId = (id: number | string): boolean => {
        return id.toString().includes('temp_');
    };

    const getAllMonths = (
        formatType: 'abbr' | 'full' | 'num' | string
    ): Array<Record<'value' | 'label', string>> => {
        return Array.from(Array(12).keys()).map(int => {
            let label = '';
            const month =
                int + 1 < 10
                    ? '0' + (int + 1).toString()
                    : (int + 1).toString();
            const year = formatDate('yyyy');

            switch (formatType) {
                case 'abbr':
                    label = formatDate('MMM', `${year}-${month}-01 00:00:00`);
                    break;
                case 'full':
                    label = formatDate('MMMM', `${year}-${month}-01 00:00:00`);
                    break;
                case 'num':
                default:
                    label = month;
                    break;
            }

            return {
                label,
                value: month,
            };
        });
    };

    const getSetAmountOfYears = (amount: number) => {
        const currentYear = +formatDate('yyyy');
        return Array.from(Array(amount).keys()).map(year => {
            return {
                label: currentYear - year,
                value: currentYear - year,
            };
        });
    };

    return {
        addMonth,
        addYear,
        formatDate,
        formatTimeZone,
        generateTempId,
        getEndDayOfMonth,
        getAllMonths,
        isTempId,
        setDoubleDigits,
        unix,
        getStartDayOfMonth,
        getSetAmountOfYears,
    };
}
