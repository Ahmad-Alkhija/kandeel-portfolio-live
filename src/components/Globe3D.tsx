import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const GOLD = 0xc9a84c
const GOLD_LIGHT = 0xe0c268
const SYRIA_LAT = 33.5
const SYRIA_LNG = 36.3
const GLOBE_RADIUS = 5

interface CountryData {
  name: string
  nameAr: string
  lat: number
  lng: number
  flightHours: string
  flightHoursAr: string
}

const COUNTRIES: CountryData[] = [
  // ===== MIDDLE EAST =====
  { name: 'Turkey', nameAr: 'تركيا', lat: 39.9, lng: 32.9, flightHours: '1.5', flightHoursAr: '1.5' },
  { name: 'Lebanon', nameAr: 'لبنان', lat: 33.9, lng: 35.5, flightHours: '0.3', flightHoursAr: '0.3' },
  { name: 'Jordan', nameAr: 'الأردن', lat: 31.9, lng: 35.9, flightHours: '0.5', flightHoursAr: '0.5' },
  { name: 'Palestine', nameAr: 'فلسطين', lat: 31.9, lng: 35.2, flightHours: '0.3', flightHoursAr: '0.3' },
  { name: 'Iraq', nameAr: 'العراق', lat: 33.3, lng: 44.4, flightHours: '1.0', flightHoursAr: '١' },
  { name: 'Kuwait', nameAr: 'الكويت', lat: 29.4, lng: 47.9, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', lat: 24.7, lng: 46.7, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'UAE', nameAr: 'الإمارات العربية المتحدة', lat: 25.2, lng: 55.3, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Qatar', nameAr: 'قطر', lat: 25.3, lng: 51.5, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'Bahrain', nameAr: 'البحرين', lat: 26.0, lng: 50.5, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Oman', nameAr: 'عمان', lat: 23.6, lng: 58.5, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Iran', nameAr: 'إيران', lat: 35.7, lng: 51.4, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Yemen', nameAr: 'اليمن', lat: 15.4, lng: 44.2, flightHours: '2.5', flightHoursAr: '٢.٥' },
  // ===== EUROPE =====
  { name: 'United Kingdom', nameAr: 'المملكة المتحدة', lat: 51.5, lng: -0.1, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'France', nameAr: 'فرنسا', lat: 48.9, lng: 2.3, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Germany', nameAr: 'ألمانيا', lat: 52.5, lng: 13.4, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Italy', nameAr: 'إيطاليا', lat: 41.9, lng: 12.5, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Spain', nameAr: 'إسبانيا', lat: 40.4, lng: -3.7, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'Portugal', nameAr: 'البرتغال', lat: 38.7, lng: -9.1, flightHours: '6.0', flightHoursAr: '٦' },
  { name: 'Netherlands', nameAr: 'هولندا', lat: 52.4, lng: 4.9, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Belgium', nameAr: 'بلجيكا', lat: 50.9, lng: 4.4, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Switzerland', nameAr: 'سويسرا', lat: 47.4, lng: 8.5, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Austria', nameAr: 'النمسا', lat: 48.2, lng: 16.4, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Greece', nameAr: 'اليونان', lat: 38.0, lng: 23.7, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Sweden', nameAr: 'السويد', lat: 59.3, lng: 18.1, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'Norway', nameAr: 'النرويج', lat: 59.9, lng: 10.8, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'Denmark', nameAr: 'الدنمارك', lat: 55.7, lng: 12.6, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Finland', nameAr: 'فنلندا', lat: 60.2, lng: 25.0, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Iceland', nameAr: 'آيسلندا', lat: 64.1, lng: -21.9, flightHours: '6.5', flightHoursAr: '٦.٥' },
  { name: 'Ireland', nameAr: 'أيرلندا', lat: 53.3, lng: -6.2, flightHours: '5.5', flightHoursAr: '٥.٥' },
  { name: 'Poland', nameAr: 'بولندا', lat: 52.2, lng: 21.0, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Czech Republic', nameAr: 'التشيك', lat: 50.1, lng: 14.4, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Hungary', nameAr: 'المجر', lat: 47.5, lng: 19.0, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'Romania', nameAr: 'رومانيا', lat: 44.4, lng: 26.1, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'Bulgaria', nameAr: 'بلغاريا', lat: 42.7, lng: 23.3, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Croatia', nameAr: 'كرواتيا', lat: 45.8, lng: 15.9, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'Serbia', nameAr: 'صربيا', lat: 44.8, lng: 20.5, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'Ukraine', nameAr: 'أوكرانيا', lat: 50.5, lng: 30.5, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Russia', nameAr: 'روسيا', lat: 55.8, lng: 37.6, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Cyprus', nameAr: 'قبرص', lat: 35.2, lng: 33.4, flightHours: '1.0', flightHoursAr: '١' },
  { name: 'Malta', nameAr: 'مالطا', lat: 35.9, lng: 14.5, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'Georgia', nameAr: 'جورجيا', lat: 41.7, lng: 44.8, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Armenia', nameAr: 'أرمينيا', lat: 40.2, lng: 44.5, flightHours: '1.5', flightHoursAr: '١.٥' },
  { name: 'Azerbaijan', nameAr: 'أذربيجان', lat: 40.4, lng: 49.9, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Belarus', nameAr: 'بيلاروسيا', lat: 53.9, lng: 27.6, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Slovakia', nameAr: 'سلوفاكيا', lat: 48.1, lng: 17.1, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Slovenia', nameAr: 'سلوفينيا', lat: 46.1, lng: 14.5, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Lithuania', nameAr: 'ليتوانيا', lat: 54.7, lng: 25.3, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Latvia', nameAr: 'لاتفيا', lat: 56.9, lng: 24.1, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Estonia', nameAr: 'إستونيا', lat: 59.4, lng: 24.8, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Albania', nameAr: 'ألبانيا', lat: 41.3, lng: 19.8, flightHours: '2.0', flightHoursAr: '٢' },
  { name: 'Luxembourg', nameAr: 'لوكسمبورغ', lat: 49.6, lng: 6.1, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Bosnia', nameAr: 'البوسنة والهرسك', lat: 43.9, lng: 18.4, flightHours: '2.5', flightHoursAr: '٢.٥' },
  // ===== AFRICA =====
  { name: 'Egypt', nameAr: 'مصر', lat: 30.0, lng: 31.2, flightHours: '1.5', flightHoursAr: '١.٥' },
  { name: 'Libya', nameAr: 'ليبيا', lat: 32.9, lng: 13.2, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'Algeria', nameAr: 'الجزائر', lat: 36.8, lng: 3.1, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Tunisia', nameAr: 'تونس', lat: 36.8, lng: 10.2, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Morocco', nameAr: 'المغرب', lat: 33.6, lng: -7.6, flightHours: '6.0', flightHoursAr: '٦' },
  { name: 'Sudan', nameAr: 'السودان', lat: 15.5, lng: 32.5, flightHours: '2.5', flightHoursAr: '٢.٥' },
  { name: 'South Sudan', nameAr: 'جنوب السودان', lat: 4.9, lng: 31.6, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Ethiopia', nameAr: 'إثيوبيا', lat: 9.0, lng: 38.7, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Eritrea', nameAr: 'إريتريا', lat: 15.3, lng: 38.9, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Djibouti', nameAr: 'جيبوتي', lat: 11.6, lng: 43.1, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Somalia', nameAr: 'الصومال', lat: 2.0, lng: 45.3, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Kenya', nameAr: 'كينيا', lat: -1.3, lng: 36.8, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'Uganda', nameAr: 'أوغندا', lat: 0.3, lng: 32.6, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Tanzania', nameAr: 'تنزانيا', lat: -6.8, lng: 39.3, flightHours: '5.5', flightHoursAr: '٥.٥' },
  { name: 'Rwanda', nameAr: 'رواندا', lat: -1.9, lng: 30.1, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Burundi', nameAr: 'بوروندي', lat: -3.4, lng: 29.9, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'Nigeria', nameAr: 'نيجيريا', lat: 9.1, lng: 7.5, flightHours: '5.5', flightHoursAr: '٥.٥' },
  { name: 'Ghana', nameAr: 'غانا', lat: 5.6, lng: -0.2, flightHours: '6.0', flightHoursAr: '٦' },
  { name: 'Senegal', nameAr: 'السنغال', lat: 14.7, lng: -17.4, flightHours: '7.0', flightHoursAr: '٧' },
  { name: 'Cameroon', nameAr: 'الكاميرون', lat: 3.9, lng: 11.5, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'Ivory Coast', nameAr: 'ساحل العاج', lat: 6.8, lng: -5.3, flightHours: '6.5', flightHoursAr: '٦.٥' },
  { name: 'Mali', nameAr: 'مالي', lat: 12.6, lng: -8.0, flightHours: '6.5', flightHoursAr: '٦.٥' },
  { name: 'Burkina Faso', nameAr: 'بوركينا فاسو', lat: 12.4, lng: -1.5, flightHours: '5.5', flightHoursAr: '٥.٥' },
  { name: 'Niger', nameAr: 'النيجر', lat: 13.5, lng: 2.1, flightHours: '5.0', flightHoursAr: '٥' },
  { name: 'Chad', nameAr: 'تشاد', lat: 12.1, lng: 15.0, flightHours: '4.0', flightHoursAr: '٤' },
  { name: 'Angola', nameAr: 'أنغولا', lat: -8.8, lng: 13.2, flightHours: '7.0', flightHoursAr: '٧' },
  { name: 'Mozambique', nameAr: 'موزمبيق', lat: -25.9, lng: 32.6, flightHours: '7.5', flightHoursAr: '٧.٥' },
  { name: 'Madagascar', nameAr: 'مدغشقر', lat: -18.9, lng: 47.5, flightHours: '8.0', flightHoursAr: '٨' },
  { name: 'Zambia', nameAr: 'زامبيا', lat: -15.4, lng: 28.3, flightHours: '6.5', flightHoursAr: '٦.٥' },
  { name: 'Zimbabwe', nameAr: 'زيمبابوي', lat: -17.8, lng: 31.1, flightHours: '7.0', flightHoursAr: '٧' },
  { name: 'South Africa', nameAr: 'جنوب أفريقيا', lat: -26.2, lng: 28.0, flightHours: '8.5', flightHoursAr: '٨.٥' },
  { name: 'DR Congo', nameAr: 'الكونغو الديمقراطية', lat: -4.3, lng: 15.3, flightHours: '6.0', flightHoursAr: '٦' },
  { name: 'Mauritania', nameAr: 'موريتانيا', lat: 18.1, lng: -15.9, flightHours: '6.5', flightHoursAr: '٦.٥' },
  { name: 'Botswana', nameAr: 'بوتسوانا', lat: -24.7, lng: 25.9, flightHours: '8.0', flightHoursAr: '٨' },
  { name: 'Mauritius', nameAr: 'موريشيوس', lat: -20.2, lng: 57.5, flightHours: '9.0', flightHoursAr: '٩' },
  // ===== ASIA =====
  { name: 'India', nameAr: 'الهند', lat: 19.1, lng: 72.9, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Pakistan', nameAr: 'باكستان', lat: 24.9, lng: 67.0, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Bangladesh', nameAr: 'بنغلاديش', lat: 23.8, lng: 90.4, flightHours: '6.0', flightHoursAr: '٦' },
  { name: 'Afghanistan', nameAr: 'أفغانستان', lat: 34.5, lng: 69.2, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Kazakhstan', nameAr: 'كازاخستان', lat: 43.3, lng: 76.9, flightHours: '4.5', flightHoursAr: '٤.٥' },
  { name: 'Uzbekistan', nameAr: 'أوزبكستان', lat: 41.3, lng: 69.2, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Turkmenistan', nameAr: 'تركمانستان', lat: 37.9, lng: 58.4, flightHours: '3.0', flightHoursAr: '٣' },
  { name: 'Tajikistan', nameAr: 'طاجيكستان', lat: 38.6, lng: 68.8, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'Kyrgyzstan', nameAr: 'قيرغيزستان', lat: 42.9, lng: 74.6, flightHours: '3.5', flightHoursAr: '٣.٥' },
  { name: 'China', nameAr: 'الصين', lat: 39.9, lng: 116.4, flightHours: '8.0', flightHoursAr: '٨' },
  { name: 'Japan', nameAr: 'اليابان', lat: 35.7, lng: 139.7, flightHours: '10.0', flightHoursAr: '١٠' },
  { name: 'South Korea', nameAr: 'كوريا الجنوبية', lat: 37.6, lng: 127.0, flightHours: '9.0', flightHoursAr: '٩' },
  { name: 'Mongolia', nameAr: 'منغوليا', lat: 47.9, lng: 106.9, flightHours: '8.0', flightHoursAr: '٨' },
  { name: 'Thailand', nameAr: 'تايلاند', lat: 13.8, lng: 100.5, flightHours: '7.5', flightHoursAr: '٧.٥' },
  { name: 'Vietnam', nameAr: 'فيتنام', lat: 21.0, lng: 105.8, flightHours: '8.0', flightHoursAr: '٨' },
  { name: 'Malaysia', nameAr: 'ماليزيا', lat: 3.1, lng: 101.7, flightHours: '8.5', flightHoursAr: '٨.٥' },
  { name: 'Singapore', nameAr: 'سنغافورة', lat: 1.3, lng: 103.8, flightHours: '9.0', flightHoursAr: '٩' },
  { name: 'Indonesia', nameAr: 'إندونيسيا', lat: -6.2, lng: 106.8, flightHours: '10.0', flightHoursAr: '١٠' },
  { name: 'Philippines', nameAr: 'الفلبين', lat: 14.6, lng: 121.0, flightHours: '10.0', flightHoursAr: '١٠' },
  { name: 'Myanmar', nameAr: 'ميانمار', lat: 16.8, lng: 96.2, flightHours: '7.0', flightHoursAr: '٧' },
  { name: 'Cambodia', nameAr: 'كمبوديا', lat: 11.6, lng: 104.9, flightHours: '8.5', flightHoursAr: '٨.٥' },
  { name: 'Laos', nameAr: 'لاوس', lat: 17.9, lng: 102.6, flightHours: '7.5', flightHoursAr: '٧.٥' },
  { name: 'Nepal', nameAr: 'نيبال', lat: 27.7, lng: 85.3, flightHours: '5.5', flightHoursAr: '٥.٥' },
  { name: 'Sri Lanka', nameAr: 'سريلانكا', lat: 6.9, lng: 79.9, flightHours: '6.5', flightHoursAr: '٦.٥' },
  { name: 'Maldives', nameAr: 'المالديف', lat: 4.2, lng: 73.5, flightHours: '5.5', flightHoursAr: '٥.٥' },
  { name: 'Bhutan', nameAr: 'بوتان', lat: 27.5, lng: 89.6, flightHours: '6.0', flightHoursAr: '٦' },
  { name: 'Brunei', nameAr: 'بروناي', lat: 4.9, lng: 115.0, flightHours: '9.0', flightHoursAr: '٩' },
  // ===== AMERICAS =====
  { name: 'United States', nameAr: 'الولايات المتحدة', lat: 40.7, lng: -74.0, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Canada', nameAr: 'كندا', lat: 43.7, lng: -79.4, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Mexico', nameAr: 'المكسيك', lat: 19.4, lng: -99.1, flightHours: '14.0', flightHoursAr: '١٤' },
  { name: 'Brazil', nameAr: 'البرازيل', lat: -23.6, lng: -46.6, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Argentina', nameAr: 'الأرجنتين', lat: -34.6, lng: -58.4, flightHours: '15.0', flightHoursAr: '١٥' },
  { name: 'Colombia', nameAr: 'كولومبيا', lat: 4.6, lng: -74.1, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Chile', nameAr: 'تشيلي', lat: -33.5, lng: -70.7, flightHours: '15.0', flightHoursAr: '١٥' },
  { name: 'Peru', nameAr: 'بيرو', lat: -12.0, lng: -77.0, flightHours: '14.0', flightHoursAr: '١٤' },
  { name: 'Venezuela', nameAr: 'فنزويلا', lat: 10.5, lng: -66.9, flightHours: '12.0', flightHoursAr: '١٢' },
  { name: 'Cuba', nameAr: 'كوبا', lat: 23.1, lng: -82.4, flightHours: '12.0', flightHoursAr: '١٢' },
  { name: 'Dominican Rep.', nameAr: 'جمهورية الدومينيكان', lat: 18.5, lng: -69.9, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Ecuador', nameAr: 'الإكوادور', lat: -0.2, lng: -78.5, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Uruguay', nameAr: 'أوروغواي', lat: -34.9, lng: -56.2, flightHours: '14.0', flightHoursAr: '١٤' },
  { name: 'Panama', nameAr: 'بنما', lat: 9.0, lng: -79.5, flightHours: '12.0', flightHoursAr: '١٢' },
  { name: 'Costa Rica', nameAr: 'كوستاريكا', lat: 9.9, lng: -84.1, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Guatemala', nameAr: 'غواتيمالا', lat: 14.6, lng: -90.5, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Bolivia', nameAr: 'بوليفيا', lat: -16.5, lng: -68.1, flightHours: '14.0', flightHoursAr: '١٤' },
  { name: 'Paraguay', nameAr: 'باراغواي', lat: -25.3, lng: -57.6, flightHours: '14.0', flightHoursAr: '١٤' },
  { name: 'El Salvador', nameAr: 'السلفادور', lat: 13.7, lng: -89.2, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Honduras', nameAr: 'هندوراس', lat: 14.1, lng: -87.2, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Nicaragua', nameAr: 'نيكاراغوا', lat: 12.1, lng: -86.2, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Haiti', nameAr: 'هايتي', lat: 18.5, lng: -72.3, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Jamaica', nameAr: 'جامايكا', lat: 18.1, lng: -76.8, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Trinidad & Tobago', nameAr: 'ترينيداد وتوباغو', lat: 10.7, lng: -61.5, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Bahamas', nameAr: 'باهاماس', lat: 25.0, lng: -77.3, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Barbados', nameAr: 'بربادوس', lat: 13.1, lng: -59.6, flightHours: '11.0', flightHoursAr: '١١' },
  { name: 'Guyana', nameAr: 'غيانا', lat: 6.8, lng: -58.2, flightHours: '11.0', flightHoursAr: '١١' },
  // ===== OCEANIA =====
  { name: 'Australia', nameAr: 'أستراليا', lat: -33.9, lng: 151.2, flightHours: '15.0', flightHoursAr: '١٥' },
  { name: 'New Zealand', nameAr: 'نيوزيلندا', lat: -36.9, lng: 174.8, flightHours: '18.0', flightHoursAr: '١٨' },
  { name: 'Fiji', nameAr: 'فيجي', lat: -18.1, lng: 178.4, flightHours: '16.0', flightHoursAr: '١٦' },
  { name: 'Papua New Guinea', nameAr: 'بابوا غينيا الجديدة', lat: -9.4, lng: 147.2, flightHours: '13.0', flightHoursAr: '١٣' },
  { name: 'Solomon Islands', nameAr: 'جزر سليمان', lat: -9.4, lng: 160.0, flightHours: '15.0', flightHoursAr: '١٥' },
  { name: 'Vanuatu', nameAr: 'فانواتو', lat: -17.7, lng: 168.3, flightHours: '16.0', flightHoursAr: '١٦' },
  { name: 'Samoa', nameAr: 'ساموا', lat: -13.8, lng: -171.8, flightHours: '18.0', flightHoursAr: '١٨' },
  { name: 'Tonga', nameAr: 'تونغا', lat: -21.1, lng: -175.2, flightHours: '18.0', flightHoursAr: '١٨' },
]

function formatFlightTime(hours: string): string {
  const h = parseFloat(hours)
  const hr = Math.floor(h)
  const min = Math.round((h - hr) * 60)
  if (min === 0) return `${hr}h`
  return `${hr}h ${min}m`
}

function formatFlightTimeAr(hoursAr: string): string {
  // Convert standard digits in hoursAr to Arabic-Indic digits, handling decimal
  const englishDigits = '0123456789.'
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩.'
  const normalized = hoursAr.replace(/[٠-٩]/g, (d) => englishDigits[arabicDigits.indexOf(d)])
  const h = parseFloat(normalized)
  const hr = Math.floor(h)
  const min = Math.round((h - hr) * 60)

  const toArabic = (n: number): string =>
    String(n).replace(/[0-9]/g, (d) => arabicDigits[parseInt(d)])

  const hrStr = toArabic(hr)
  const minStr = toArabic(min)

  // Arabic pluralization: 1=singular, 2=dual, 3-10=plural, 11+=singular
  const arHour = (n: number) => (n >= 3 && n <= 10) ? 'ساعات' : (n === 2 ? 'ساعتين' : 'ساعة')
  const arMin = (n: number) => (n >= 3 && n <= 10) ? 'دقائق' : (n === 2 ? 'دقيقتين' : 'دقيقة')

  if (min === 0) return `${hrStr} ${arHour(hr)}`
  if (hr === 0) return `${minStr} ${arMin(min)}`
  return `${hrStr} ${arHour(hr)} و ${minStr} ${arMin(min)}`
}

function latLngToPos(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * Math.PI / 180
  const theta = (lng + 180) * Math.PI / 180
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

// ---- Procedural Earth-colored texture ----
// Generates a stylized equirectangular map (ocean + continents + polar caps)
// so the globe reads as "Earth" in color without needing an external image asset.
// Pixel <-> lat/lng mapping matches latLngToPos's theta/phi convention, so
// landmasses line up reasonably well with the real country markers above.
function createEarthTexture(): THREE.CanvasTexture {
  const W = 1024
  const H = 512
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  const toPx = (lat: number, lng: number): [number, number] => [
    ((lng + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ]

  // Ocean base — deep navy-teal near poles, lighter tropical blue at the equator
  const ocean = ctx.createLinearGradient(0, 0, 0, H)
  ocean.addColorStop(0, '#0d2a44')
  ocean.addColorStop(0.5, '#1c5a82')
  ocean.addColorStop(1, '#0d2a44')
  ctx.fillStyle = ocean
  ctx.fillRect(0, 0, W, H)

  // Simplified continent silhouettes: [lat, lng][]
  const continents: { points: [number, number][]; color: string }[] = [
    {
      // North America
      points: [
        [70, -165], [72, -125], [72, -95], [60, -75], [50, -55], [45, -60],
        [30, -81], [25, -97], [18, -95], [14, -90], [18, -105], [30, -115],
        [48, -125], [60, -140],
      ],
      color: '#4f7a4a',
    },
    {
      // South America
      points: [
        [12, -72], [10, -62], [0, -50], [-10, -35], [-23, -43], [-34, -58],
        [-45, -68], [-55, -70], [-50, -73], [-30, -71], [-15, -75], [-5, -81],
        [5, -77],
      ],
      color: '#4a7d52',
    },
    {
      // Europe
      points: [
        [71, 25], [65, 15], [60, 30], [55, 38], [47, 40], [43, 28], [40, 20],
        [38, 15], [43, 3], [48, -2], [52, -5], [58, 5], [65, 10],
      ],
      color: '#5c8452',
    },
    {
      // Africa
      points: [
        [37, 10], [32, 32], [22, 38], [12, 51], [0, 42], [-15, 40], [-25, 33],
        [-34, 20], [-30, 15], [-20, 12], [-5, 10], [5, -5], [15, -17], [25, -15],
        [33, -6],
      ],
      color: '#a3874f',
    },
    {
      // Asia
      points: [
        [77, 105], [70, 140], [60, 160], [45, 140], [35, 130], [22, 120],
        [10, 105], [1, 104], [8, 80], [20, 72], [25, 65], [30, 50], [37, 36],
        [45, 35], [55, 40], [60, 60], [65, 80], [75, 90],
      ],
      color: '#6b8a4f',
    },
    {
      // Australia
      points: [
        [-11, 131], [-17, 146], [-25, 153], [-34, 151], [-38, 141], [-35, 117],
        [-25, 113], [-18, 122],
      ],
      color: '#ab8956',
    },
    {
      // Greenland
      points: [[83, -35], [75, -20], [60, -45], [70, -55]],
      color: '#e8ecef',
    },
  ]

  ctx.lineJoin = 'round'
  for (const { points, color } of continents) {
    ctx.beginPath()
    points.forEach(([lat, lng], i) => {
      const [x, y] = toPx(lat, lng)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
  }

  // Polar ice caps
  const capGrad = (fromY: number, toY: number) => {
    const g = ctx.createLinearGradient(0, fromY, 0, toY)
    g.addColorStop(0, 'rgba(240,245,250,0.95)')
    g.addColorStop(1, 'rgba(240,245,250,0)')
    return g
  }
  ctx.fillStyle = capGrad(0, H * 0.1)
  ctx.fillRect(0, 0, W, H * 0.1)
  ctx.fillStyle = capGrad(H, H * 0.86)
  ctx.fillRect(0, H * 0.86, W, H * 0.14)

  // Subtle terrain speckle for texture depth
  for (let i = 0; i < 2500; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const shade = Math.random() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'
    ctx.fillStyle = shade
    ctx.beginPath()
    ctx.arc(x, y, Math.random() * 1.6, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

interface HoverInfo {
  country: CountryData
  screenX: number
  screenY: number
}

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null)
  const isRtl = document.documentElement.dir === 'rtl'

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let destroyed = false
    let animationId = 0

    // ---- Scene Setup ----
    const scene = new THREE.Scene()

    const aspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100)
    camera.position.set(14, 5, 18)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // ---- OrbitControls ----
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.rotateSpeed = 0.6
    controls.minDistance = 14
    controls.maxDistance = 35
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.target.set(0, 0, 0)
    controls.update()

    // ---- Lights ----
    // Neutral ambient so the true ocean/land colors read clearly instead of being tinted gold
    const ambientLight = new THREE.AmbientLight(0x4a5568, 0.65)
    scene.add(ambientLight)

    // Warm "sunlight" — still ties into the brand's gold accent, but soft enough not to wash out color
    const dirLight = new THREE.DirectionalLight(0xfff2e0, 1.25)
    dirLight.position.set(5, 10, 7)
    scene.add(dirLight)

    // Cool fill light from the shadow side, like reflected earthlight/skylight
    const backLight = new THREE.DirectionalLight(0x2c4a75, 0.35)
    backLight.position.set(-5, -5, -7)
    scene.add(backLight)

    // ---- Stars Background ----
    const starCount = 2000
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 30 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.cos(phi)
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const starGeom = new THREE.BufferGeometry()
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    })
    scene.add(new THREE.Points(starGeom, starMat))

    // ---- Globe Sphere (Earth-colored) ----
    const earthTexture = createEarthTexture()
    const sphereGeom = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64)
    const sphereMat = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specular: 0x2a4a6a,
      shininess: 14,
    })
    const globe = new THREE.Mesh(sphereGeom, sphereMat)
    scene.add(globe)

    // Faint latitude/longitude graticule overlay
    const wireframeGeom = new THREE.SphereGeometry(GLOBE_RADIUS * 1.002, 24, 16)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    })
    const wireframeGlobe = new THREE.Mesh(wireframeGeom, wireframeMat)
    scene.add(wireframeGlobe)

    // Soft blue atmosphere glow around the rim (classic Fresnel "earth from space" effect)
    const atmosphereGeom = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 48, 48)
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize( normalMatrix * normal );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow( 0.6 - dot( vNormal, vec3(0.0, 0.0, 1.0) ), 3.5 );
          gl_FragColor = vec4( 0.35, 0.65, 1.0, 1.0 ) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat)
    scene.add(atmosphere)

    // ---- Syria Marker (larger, pulsing) ----
    const syriaPos = latLngToPos(SYRIA_LAT, SYRIA_LNG, GLOBE_RADIUS * 1.01)
    const syriaMarkerGeom = new THREE.SphereGeometry(0.15, 12, 12)
    const syriaMarkerMat = new THREE.MeshBasicMaterial({
      color: GOLD_LIGHT,
      transparent: true,
      opacity: 1,
    })
    const syriaMarker = new THREE.Mesh(syriaMarkerGeom, syriaMarkerMat)
    syriaMarker.position.copy(syriaPos)
    scene.add(syriaMarker)

    // Syria glow ring
    const syriaGlowGeom = new THREE.RingGeometry(0.1, 0.3, 16)
    const syriaGlowMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const syriaGlow = new THREE.Mesh(syriaGlowGeom, syriaGlowMat)
    syriaGlow.position.copy(syriaPos)
    syriaGlow.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(syriaGlow)

    // ---- Country Markers & Arc Lines ----
    const markerGroup = new THREE.Group()
    scene.add(markerGroup)

    // Store country data for raycasting
    const countryMarkers: { mesh: THREE.Mesh; country: CountryData }[] = []

    // Create circular texture for markers
    const mkCanvas = document.createElement('canvas')
    mkCanvas.width = 32
    mkCanvas.height = 32
    const mkCtx = mkCanvas.getContext('2d')!
    const mkGrad = mkCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
    mkGrad.addColorStop(0, 'rgba(201, 168, 76, 1)')
    mkGrad.addColorStop(0.3, 'rgba(201, 168, 76, 0.8)')
    mkGrad.addColorStop(0.6, 'rgba(224, 194, 104, 0.3)')
    mkGrad.addColorStop(1, 'rgba(201, 168, 76, 0)')
    mkCtx.fillStyle = mkGrad
    mkCtx.fillRect(0, 0, 32, 32)
    const markerTexture = new THREE.CanvasTexture(mkCanvas)

    const markerMat = new THREE.SpriteMaterial({
      map: markerTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    })

    for (const country of COUNTRIES) {
      const pos = latLngToPos(country.lat, country.lng, GLOBE_RADIUS * 1.01)

      // Glowing point marker (smaller for better separation)
      const markerGeom = new THREE.SphereGeometry(0.045, 8, 8)
      const markerMatInst = new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.8,
      })
      const marker = new THREE.Mesh(markerGeom, markerMatInst)
      marker.position.copy(pos)
      markerGroup.add(marker)
      countryMarkers.push({ mesh: marker, country })

      // Sprite glow (smaller)
      const sprite = new THREE.Sprite(markerMat.clone())
      sprite.position.copy(pos)
      sprite.scale.set(0.25, 0.25, 1)
      markerGroup.add(sprite)

      // Arc line from Syria to country
      const midLat = (SYRIA_LAT + country.lat) / 2
      const midLng = (SYRIA_LNG + country.lng) / 2
      const midPos = latLngToPos(midLat, midLng, GLOBE_RADIUS * 1.8)

      // Create a quadratic bezier curve
      const curve = new THREE.QuadraticBezierCurve3(syriaPos, midPos, pos)
      const curvePoints = curve.getPoints(30)

      // Create arc as a tube or line
      const arcGeom = new THREE.BufferGeometry().setFromPoints(curvePoints)
      const arcMat = new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.15,
      })
      const arcLine = new THREE.Line(arcGeom, arcMat)
      markerGroup.add(arcLine)

      // Thinner glowing inner line
      const innerArcMat = new THREE.LineBasicMaterial({
        color: GOLD_LIGHT,
        transparent: true,
        opacity: 0.04,
      })
      const innerArc = new THREE.Line(arcGeom.clone(), innerArcMat)
      // Slightly offset
      innerArc.position.copy(midPos.clone().normalize().multiplyScalar(0.02))
      markerGroup.add(innerArc)
    }

    // ---- Raycaster for hover detection ----
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    // Collect all interactive meshes
    const interactiveMeshes = countryMarkers.map((cm) => cm.mesh)

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(interactiveMeshes)

      if (intersects.length > 0) {
        const hit = intersects[0].object
        const found = countryMarkers.find((cm) => cm.mesh === hit)
        if (found) {
          // Project 3D position to screen coords
          const pos3D = found.mesh.position.clone()
          const projected = pos3D.project(camera)
          const screenX = (projected.x * 0.5 + 0.5) * container.clientWidth
          const screenY = (-projected.y * 0.5 + 0.5) * container.clientHeight
          setHoverInfo({ country: found.country, screenX, screenY })

          controls.autoRotate = false
          renderer.domElement.style.cursor = 'pointer'
          return
        }
      }

      // No hover
      setHoverInfo(null)
      controls.autoRotate = true
      renderer.domElement.style.cursor = 'grab'
    }

    renderer.domElement.addEventListener('pointermove', handlePointerMove)

    // ---- Resize ----
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // ---- Animation Loop ----
    let time = 0

    const animate = () => {
      if (destroyed) return
      animationId = requestAnimationFrame(animate)
      time += 0.005

      // Controls damping + autoRotate
      controls.update()

      // Syria marker pulse
      const pulse = 1 + Math.sin(time * 2) * 0.15
      syriaMarker.scale.set(pulse, pulse, pulse)
      syriaMarkerMat.opacity = 0.7 + Math.sin(time * 2) * 0.3
      syriaGlow.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2)
      syriaGlowMat.opacity = 0.25 + Math.sin(time * 2) * 0.15

      // Country marker subtle pulse (staggered)
      for (let i = 0; i < countryMarkers.length; i++) {
        const cm = countryMarkers[i]
        const p = 1 + Math.sin(time * 1.5 + i * 0.5) * 0.1
        cm.mesh.scale.set(p, p, p)
      }

      renderer.render(scene, camera)
    }

    animate()

    // ---- Cleanup ----
    return () => {
      destroyed = true
      cancelAnimationFrame(animationId)
      controls.dispose()
      renderer.domElement.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)

      scene.traverse((obj) => {
        const o = obj as THREE.Mesh | THREE.Points | THREE.Line | THREE.Sprite
        if (o.geometry) o.geometry.dispose()
        if (o.material) {
          if (Array.isArray(o.material)) {
            o.material.forEach((m) => {
              const mm = m as THREE.Material & { map?: THREE.Texture | null }
              if (mm.map) mm.map.dispose()
              m.dispose()
            })
          } else {
            const mm = o.material as THREE.Material & { map?: THREE.Texture | null }
            if (mm.map) mm.map.dispose()
            o.material.dispose()
          }
        }
      })
      markerMat.dispose()
      markerTexture.dispose()
      renderer.dispose()

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {/* Tooltip */}
      {hoverInfo && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: hoverInfo.screenX,
            top: hoverInfo.screenY - 50,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-aviation-navy/90 backdrop-blur-md border border-aviation-gold/30 rounded-xl px-4 py-2.5 shadow-xl shadow-black/30">
            <p className={`text-sm font-semibold text-aviation-gold ${isRtl ? 'font-arabic text-right' : ''}`}>
              {isRtl ? hoverInfo.country.nameAr : hoverInfo.country.name}
            </p>
            <p className={`text-xs text-white/70 mt-0.5 ${isRtl ? 'font-arabic text-right' : ''}`}>
              {isRtl
                ? `مسافة الرحلة: ${formatFlightTimeAr(hoverInfo.country.flightHoursAr)}`
                : `Flight time: ${formatFlightTime(hoverInfo.country.flightHours)}`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  )
}