export type Language = 'en' | 'ru' | 'uz';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    rooms: string;
    booking: string;
    contact: string;
  };
  
  // Home page
  home: {
    welcome: string;
    hotelName: string;
    subtitle: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
    searchRooms: string;
    featuredRooms: string;
    featuredSubtitle: string;
    amenitiesTitle: string;
    amenitiesSubtitle: string;
    viewDetails: string;
    perNight: string;
    freeWifi: string;
    freeWifiDesc: string;
    poolSpa: string;
    poolSpaDesc: string;
    fineDining: string;
    fineDiningDesc: string;
    valetParking: string;
    valetParkingDesc: string;
  };
  
  // Rooms page
  rooms: {
    title: string;
    subtitle: string;
    roomType: string;
    allTypes: string;
    standard: string;
    deluxe: string;
    suite: string;
    priceRange: string;
    allPrices: string;
    amenities: string;
    allAmenities: string;
    oceanView: string;
    balcony: string;
    suiteFeatures: string;
    applyFilters: string;
    guests: string;
    available: string;
    fullyBooked: string;
    bookNow: string;
    noRoomsFound: string;
    noRoomsDesc: string;
  };
  
  // Booking page
  booking: {
    title: string;
    subtitle: string;
    guestInfo: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    stayDetails: string;
    checkInDate: string;
    checkOutDate: string;
    roomType: string;
    selectRoom: string;
    numberOfGuests: string;
    specialRequests: string;
    specialRequestsPlaceholder: string;
    completeBooking: string;
    processing: string;
    bookingSummary: string;
    checkIn: string;
    checkOut: string;
    notSelected: string;
    nights: string;
    guests: string;
    roomRate: string;
    taxesFees: string;
    total: string;
    pmsConnected: string;
    bookingConfirmed: string;
    bookingConfirmedDesc: string;
    bookingFailed: string;
    bookingFailedDesc: string;
    selectRoomError: string;
  };
  
  // Contact page
  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    frontDesk: string;
    reservations: string;
    concierge: string;
    sendMessage: string;
    subject: string;
    selectSubject: string;
    reservationInquiry: string;
    existingBooking: string;
    amenitiesServices: string;
    eventsMeetings: string;
    feedback: string;
    other: string;
    message: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    messageSent: string;
    messageSentDesc: string;
    messageError: string;
    messageErrorDesc: string;
  };
  
  // Footer
  footer: {
    quickLinks: string;
    services: string;
    contactInfo: string;
    roomService: string;
    concierge: string;
    spa: string;
    businessCenter: string;
    allRightsReserved: string;
  };
  
  // Common
  common: {
    guest: string;
    guests: string;
    room: string;
    rooms: string;
    night: string;
    nights: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      rooms: "Rooms",
      booking: "Book Now",
      contact: "Contact"
    },
    home: {
      welcome: "Welcome to",
      hotelName: "Nur Makon Hotel",
      subtitle: "Experience luxury and comfort in the heart of the city",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      rooms: "Rooms",
      searchRooms: "Search Rooms",
      featuredRooms: "Featured Accommodations",
      featuredSubtitle: "Discover our premium rooms and suites",
      amenitiesTitle: "World-Class Amenities",
      amenitiesSubtitle: "Everything you need for a perfect stay",
      viewDetails: "View Details",
      perNight: "/night",
      freeWifi: "Free Wi-Fi",
      freeWifiDesc: "High-speed internet throughout the hotel",
      poolSpa: "Pool & Spa",
      poolSpaDesc: "Rooftop pool and full-service spa",
      fineDining: "Fine Dining",
      fineDiningDesc: "Award-winning restaurant and bar",
      valetParking: "Valet Parking",
      valetParkingDesc: "Convenient valet and self-parking"
    },
    rooms: {
      title: "Our Rooms & Suites",
      subtitle: "Find the perfect accommodation for your stay",
      roomType: "Room Type",
      allTypes: "All Types",
      standard: "Standard Rooms",
      deluxe: "Deluxe Rooms",
      suite: "Suites",
      priceRange: "Price Range",
      allPrices: "All Prices",
      amenities: "Amenities",
      allAmenities: "All Amenities",
      oceanView: "Ocean View",
      balcony: "Balcony",
      suiteFeatures: "Suite Features",
      applyFilters: "Apply Filters",
      guests: "Guests",
      available: "Available",
      fullyBooked: "Fully Booked",
      bookNow: "Book Now",
      noRoomsFound: "No rooms found",
      noRoomsDesc: "Try adjusting your filters to see more options."
    },
    booking: {
      title: "Complete Your Booking",
      subtitle: "Just a few steps to secure your stay",
      guestInfo: "Guest Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      stayDetails: "Stay Details",
      checkInDate: "Check-in Date",
      checkOutDate: "Check-out Date",
      roomType: "Room Type",
      selectRoom: "Select Room Type",
      numberOfGuests: "Number of Guests",
      specialRequests: "Special Requests",
      specialRequestsPlaceholder: "Any special accommodations or requests...",
      completeBooking: "Complete Booking",
      processing: "Processing...",
      bookingSummary: "Booking Summary",
      checkIn: "Check-in:",
      checkOut: "Check-out:",
      notSelected: "Not selected",
      nights: "Nights:",
      guests: "Guests:",
      roomRate: "Room Rate",
      taxesFees: "Taxes & Fees:",
      total: "Total:",
      pmsConnected: "PMS Connected - Real-time availability",
      bookingConfirmed: "Booking Confirmed!",
      bookingConfirmedDesc: "Your reservation has been successfully created. You will receive a confirmation email shortly.",
      bookingFailed: "Booking Failed",
      bookingFailedDesc: "There was an error processing your booking. Please try again.",
      selectRoomError: "Please select a room and valid dates."
    },
    contact: {
      title: "Contact Us",
      subtitle: "We're here to help make your stay perfect",
      getInTouch: "Get In Touch",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
      frontDesk: "Front Desk: 24/7",
      reservations: "Reservations",
      concierge: "Concierge: 7:00 AM - 11:00 PM",
      sendMessage: "Send Us a Message",
      subject: "Subject",
      selectSubject: "Select a subject",
      reservationInquiry: "Reservation Inquiry",
      existingBooking: "Existing Booking",
      amenitiesServices: "Amenities & Services",
      eventsMeetings: "Events & Meetings",
      feedback: "Feedback",
      other: "Other",
      message: "Message",
      messagePlaceholder: "Please provide details about your inquiry...",
      sendButton: "Send Message",
      sending: "Sending...",
      messageSent: "Message Sent!",
      messageSentDesc: "Thank you for contacting us. We will get back to you within 24 hours.",
      messageError: "Error",
      messageErrorDesc: "There was an error sending your message. Please try again."
    },
    footer: {
      quickLinks: "Quick Links",
      services: "Services",
      contactInfo: "Contact Info",
      roomService: "Room Service",
      concierge: "Concierge",
      spa: "Spa & Wellness",
      businessCenter: "Business Center",
      allRightsReserved: "All rights reserved."
    },
    common: {
      guest: "Guest",
      guests: "Guests",
      room: "Room",
      rooms: "Rooms",
      night: "night",
      nights: "nights"
    }
  },
  ru: {
    nav: {
      home: "Главная",
      rooms: "Номера",
      booking: "Бронировать",
      contact: "Контакты"
    },
    home: {
      welcome: "Добро пожаловать в",
      hotelName: "Nur Makon Hotel",
      subtitle: "Испытайте роскошь и комфорт в центре города",
      checkIn: "Заезд",
      checkOut: "Выезд",
      guests: "Гости",
      rooms: "Номера",
      searchRooms: "Поиск номеров",
      featuredRooms: "Рекомендуемые номера",
      featuredSubtitle: "Откройте для себя наши премиальные номера и люксы",
      amenitiesTitle: "Услуги мирового класса",
      amenitiesSubtitle: "Всё необходимое для идеального отдыха",
      viewDetails: "Подробнее",
      perNight: "/ночь",
      freeWifi: "Бесплатный Wi-Fi",
      freeWifiDesc: "Высокоскоростной интернет по всему отелю",
      poolSpa: "Бассейн и СПА",
      poolSpaDesc: "Бассейн на крыше и полный спектр СПА-услуг",
      fineDining: "Изысканная кухня",
      fineDiningDesc: "Отмеченный наградами ресторан и бар",
      valetParking: "Парковка",
      valetParkingDesc: "Удобная парковка с обслуживанием"
    },
    rooms: {
      title: "Наши номера и люксы",
      subtitle: "Найдите идеальное размещение для вашего пребывания",
      roomType: "Тип номера",
      allTypes: "Все типы",
      standard: "Стандартные номера",
      deluxe: "Номера люкс",
      suite: "Апартаменты",
      priceRange: "Ценовой диапазон",
      allPrices: "Все цены",
      amenities: "Удобства",
      allAmenities: "Все удобства",
      oceanView: "Вид на океан",
      balcony: "Балкон",
      suiteFeatures: "Особенности люкса",
      applyFilters: "Применить фильтры",
      guests: "Гостей",
      available: "Доступно",
      fullyBooked: "Забронировано",
      bookNow: "Забронировать",
      noRoomsFound: "Номера не найдены",
      noRoomsDesc: "Попробуйте изменить фильтры для просмотра других вариантов."
    },
    booking: {
      title: "Завершите бронирование",
      subtitle: "Всего несколько шагов для подтверждения вашего пребывания",
      guestInfo: "Информация о госте",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Email",
      phone: "Телефон",
      stayDetails: "Детали пребывания",
      checkInDate: "Дата заезда",
      checkOutDate: "Дата выезда",
      roomType: "Тип номера",
      selectRoom: "Выберите тип номера",
      numberOfGuests: "Количество гостей",
      specialRequests: "Особые пожелания",
      specialRequestsPlaceholder: "Любые особые условия или пожелания...",
      completeBooking: "Завершить бронирование",
      processing: "Обработка...",
      bookingSummary: "Сводка бронирования",
      checkIn: "Заезд:",
      checkOut: "Выезд:",
      notSelected: "Не выбрано",
      nights: "Ночей:",
      guests: "Гостей:",
      roomRate: "Стоимость номера",
      taxesFees: "Налоги и сборы:",
      total: "Итого:",
      pmsConnected: "PMS подключена - Доступность в реальном времени",
      bookingConfirmed: "Бронирование подтверждено!",
      bookingConfirmedDesc: "Ваша бронь успешно создана. Вы получите подтверждение на email в ближайшее время.",
      bookingFailed: "Ошибка бронирования",
      bookingFailedDesc: "Произошла ошибка при обработке вашего бронирования. Пожалуйста, попробуйте снова.",
      selectRoomError: "Пожалуйста, выберите номер и действительные даты."
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Мы здесь, чтобы сделать ваше пребывание идеальным",
      getInTouch: "Связаться с нами",
      address: "Адрес",
      phone: "Телефон",
      email: "Email",
      hours: "Часы работы",
      frontDesk: "Стойка регистрации: 24/7",
      reservations: "Бронирование",
      concierge: "Консьерж: 7:00 - 23:00",
      sendMessage: "Отправить сообщение",
      subject: "Тема",
      selectSubject: "Выберите тему",
      reservationInquiry: "Запрос о бронировании",
      existingBooking: "Существующее бронирование",
      amenitiesServices: "Удобства и услуги",
      eventsMeetings: "События и встречи",
      feedback: "Отзыв",
      other: "Другое",
      message: "Сообщение",
      messagePlaceholder: "Пожалуйста, предоставьте детали вашего запроса...",
      sendButton: "Отправить сообщение",
      sending: "Отправка...",
      messageSent: "Сообщение отправлено!",
      messageSentDesc: "Спасибо за обращение к нам. Мы свяжемся с вами в течение 24 часов.",
      messageError: "Ошибка",
      messageErrorDesc: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте снова."
    },
    footer: {
      quickLinks: "Быстрые ссылки",
      services: "Услуги",
      contactInfo: "Контактная информация",
      roomService: "Обслуживание номеров",
      concierge: "Консьерж",
      spa: "СПА и велнес",
      businessCenter: "Бизнес-центр",
      allRightsReserved: "Все права защищены."
    },
    common: {
      guest: "Гость",
      guests: "Гостей",
      room: "Номер",
      rooms: "Номеров",
      night: "ночь",
      nights: "ночей"
    }
  },
  uz: {
    nav: {
      home: "Bosh sahifa",
      rooms: "Xonalar",
      booking: "Bron qilish",
      contact: "Aloqa"
    },
    home: {
      welcome: "Xush kelibsiz",
      hotelName: "Nur Makon Hotel",
      subtitle: "Shahar markazida hashamat va qulaylikni his eting",
      checkIn: "Kelish",
      checkOut: "Ketish",
      guests: "Mehmonlar",
      rooms: "Xonalar",
      searchRooms: "Xonalarni qidirish",
      featuredRooms: "Tavsiya etilgan xonalar",
      featuredSubtitle: "Bizning premium xonalar va lyukslarimizni kashf eting",
      amenitiesTitle: "Jahon darajasidagi qulayliklar",
      amenitiesSubtitle: "Mukammal dam olish uchun barcha kerakli narsalar",
      viewDetails: "Batafsil",
      perNight: "/kecha",
      freeWifi: "Bepul Wi-Fi",
      freeWifiDesc: "Mehmonxona bo'ylab yuqori tezlikdagi internet",
      poolSpa: "Hovuz va SPA",
      poolSpaDesc: "Tom ustidagi hovuz va to'liq SPA xizmatlari",
      fineDining: "Nozik ovqatlanish",
      fineDiningDesc: "Mukofotlangan restoran va bar",
      valetParking: "Avtoturargoh",
      valetParkingDesc: "Qulay xizmat ko'rsatish bilan avtoturargoh"
    },
    rooms: {
      title: "Bizning xonalar va lyukslar",
      subtitle: "Yashash uchun ideal joyni toping",
      roomType: "Xona turi",
      allTypes: "Barcha turlar",
      standard: "Standart xonalar",
      deluxe: "Lyuks xonalar",
      suite: "Apartamentlar",
      priceRange: "Narx diapazoni",
      allPrices: "Barcha narxlar",
      amenities: "Qulayliklar",
      allAmenities: "Barcha qulayliklar",
      oceanView: "Okean manzarasi",
      balcony: "Balkon",
      suiteFeatures: "Lyuks xususiyatlari",
      applyFilters: "Filtrlarni qo'llash",
      guests: "Mehmonlar",
      available: "Mavjud",
      fullyBooked: "To'liq band",
      bookNow: "Bron qilish",
      noRoomsFound: "Xonalar topilmadi",
      noRoomsDesc: "Ko'proq variantlarni ko'rish uchun filtrlarni o'zgartirib ko'ring."
    },
    booking: {
      title: "Bronlashni yakunlang",
      subtitle: "Qolishingizni tasdiqlash uchun bir necha qadam",
      guestInfo: "Mehmon ma'lumotlari",
      firstName: "Ism",
      lastName: "Familiya",
      email: "Email",
      phone: "Telefon",
      stayDetails: "Qolish tafsilotlari",
      checkInDate: "Kelish sanasi",
      checkOutDate: "Ketish sanasi",
      roomType: "Xona turi",
      selectRoom: "Xona turini tanlang",
      numberOfGuests: "Mehmonlar soni",
      specialRequests: "Maxsus talablar",
      specialRequestsPlaceholder: "Har qanday maxsus shartlar yoki talablar...",
      completeBooking: "Bronlashni yakunlash",
      processing: "Qayta ishlanmoqda...",
      bookingSummary: "Bronlash xulosasi",
      checkIn: "Kelish:",
      checkOut: "Ketish:",
      notSelected: "Tanlanmagan",
      nights: "Kechalar:",
      guests: "Mehmonlar:",
      roomRate: "Xona narxi",
      taxesFees: "Soliqlar va to'lovlar:",
      total: "Jami:",
      pmsConnected: "PMS ulangan - Real vaqtda mavjudlik",
      bookingConfirmed: "Bronlash tasdiqlandi!",
      bookingConfirmedDesc: "Sizning bronlashingiz muvaffaqiyatli yaratildi. Tez orada tasdiq elektron pochtasini olasiz.",
      bookingFailed: "Bronlash xatosi",
      bookingFailedDesc: "Bronlashni qayta ishlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
      selectRoomError: "Iltimos, xona va haqiqiy sanalarni tanlang."
    },
    contact: {
      title: "Biz bilan aloqa",
      subtitle: "Sizning qolishingizni mukammal qilish uchun shu yerdamiz",
      getInTouch: "Bog'lanish",
      address: "Manzil",
      phone: "Telefon",
      email: "Email",
      hours: "Ish vaqti",
      frontDesk: "Qabul: 24/7",
      reservations: "Bronlash",
      concierge: "Konsyerj: 7:00 - 23:00",
      sendMessage: "Xabar yuborish",
      subject: "Mavzu",
      selectSubject: "Mavzuni tanlang",
      reservationInquiry: "Bronlash so'rovi",
      existingBooking: "Mavjud bronlash",
      amenitiesServices: "Qulayliklar va xizmatlar",
      eventsMeetings: "Tadbirlar va uchrashuvlar",
      feedback: "Fikr-mulohaza",
      other: "Boshqa",
      message: "Xabar",
      messagePlaceholder: "Iltimos, so'rovingiz haqida tafsilotlarni bering...",
      sendButton: "Xabar yuborish",
      sending: "Yuborilmoqda...",
      messageSent: "Xabar yuborildi!",
      messageSentDesc: "Biz bilan bog'langaningiz uchun rahmat. 24 soat ichida sizga javob beramiz.",
      messageError: "Xatolik",
      messageErrorDesc: "Xabaringizni yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
    },
    footer: {
      quickLinks: "Tezkor havolalar",
      services: "Xizmatlar",
      contactInfo: "Aloqa ma'lumotlari",
      roomService: "Xona xizmati",
      concierge: "Konsyerj",
      spa: "SPA va salomatlik",
      businessCenter: "Biznes markaz",
      allRightsReserved: "Barcha huquqlar himoyalangan."
    },
    common: {
      guest: "Mehmon",
      guests: "Mehmonlar",
      room: "Xona",
      rooms: "Xonalar",
      night: "kecha",
      nights: "kechalar"
    }
  }
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};