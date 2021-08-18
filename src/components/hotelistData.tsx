export const hotelData =[
    {
        "type": "hotel-offers",
        "hotel": {
            "type": "hotel",
            "hotelId": "ICSINICA",
            "chainCode": "IC",
            "dupeId": "700001440",
            "name": "INTERCONTINENTAL HOTEL",
            "rating": "5",
            "cityCode": "SIN",
            "latitude": 1.29812,
            "longitude": 103.85498,
            "hotelDistance": {
                "distance": 0.7,
                "distanceUnit": "KM"
            },
            "address": {
                "lines": [
                    "80 MIDDLE ROAD"
                ],
                "cityName": "SINGAPORE",
                "countryCode": "SG"
            },
            "contact": {
                "phone": "+65 6 3387600",
                "fax": "+65 6 3387366"
            },
            "description": {
                "lang": "en",
                "text": "A unique landmark in the heart of Bugis, InterContinental Singapore connects guests to an established arts, cultural and heritage district with more than 20 historical sites, national monuments, art institutions and museums. Guests are also invited to discover the colourful faces of Singapore through exploration of neighbouring areas such as Arab Street, Kampong Glam and Little India which house an array of boutiques, cafes and galleries. This Singapore hotel, served by an efficient subway network, is also located close to the Central Business District, Suntec Singapore International Convention and Exhibition Centre, Marina Bay, Orchard Road shopping and entertainment district as well as the Chinatown Heritage Centre. The Sentosa Island resort is only a short drive away."
            },
            "amenities": [
                "24_HOUR_FRONT_DESK",
                "24_HOUR_ROOM_SERVICE",
                "AIRLINE_DESK",
                "ATM/CASH_MACHINE",
                "BABY-SITTING",
                "CAR_RENTAL",
                "COFFEE_SHOP",
                "CONCIERGE",
                "CONFERENCE_FACILITIES",
                "EXCHANGE_FACILITIES",
                "DOCTOR_ON_CALL",
                "EXECUTIVE_FLOOR",
                "GYM",
                "EXPRESS_CHECK_IN",
                "EXPRESS_CHECK_OUT",
                "GIFT_SHOP",
                "ACCESSIBLE_FACILITIES",
                "WHEELCHAIR_ACCESSIBLE_PUBLIC_AREA",
                "HANDRAILS_BATHROOM",
                "ACCESSIBLE_PARKING",
                "WHEELCHAIR_ACCESSIBLE_ROOM",
                "ICE_MACHINES",
                "LAUNDRY_SERVICE",
                "ON-SITE_PARKING",
                "OUTDOOR_POOL",
                "PARKING",
                "SWIMMING_POOL",
                "RESTAURANT",
                "ROOM_SERVICE",
                "SAFE_DEPOSIT_BOX",
                "CONVENIENCE_STORE",
                "TOUR_DESK",
                "DRY_CLEANING",
                "VALET_PARKING",
                "PORTER/BELLBOY",
                "FRONT_DESK",
                "WIFI",
                "WIRELESS_CONNECTIVITY",
                "NURSERY",
                "HIGH_SPEED_WIRELESS",
                "FEMA_FIRE_SAFETY_COMPLIANT",
                "PHOTOCOPIER",
                "PRINTER",
                "AUDIO-VISUAL_EQUIPMENT",
                "BUSINESS_CENTER",
                "COMPUTER_RENTAL",
                "LCD/PROJECTOR",
                "OVERHEAD_PROJECTOR",
                "SECRETARIAL_SERVICES",
                "CONFERENCE_SUITE",
                "CONVENTION_CENTRE",
                "MEETING_FACILITIES",
                "FIRE_SAFETY",
                "EMERGENCY_BACKUP_GENERATOR",
                "EMERGENCY_LIGHTING",
                "FIRE_DETECTORS",
                "SPRINKLERS",
                "SECURITY_GUARD",
                "VIDEO_SURVEILANCE",
                "FEMA_FIRE_SAFETY_COMPLIANT",
                "CRIBS_AVAILABLE",
                "MINIBAR",
                "NON_SMOKING_ROOMS",
                "WAKEUP_SERVICE",
                "WI-FI_IN_ROOM",
                "FREE_HIGH_SPEED_INTERNET_IN_ROOM",
                "MAID_SERVICE",
                "GOLF",
                "BOATING",
                "FISHING",
                "FITNESS_CENTER",
                "SCUBA_DIVING"
            ],
            "media": [
                {
                    "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/0C74D8224FEA466B8416A4D023157953",
                    "category": "EXTERIOR"
                }
            ]
        },
        "available": true,
        "offers": [
            {
                "id": "95C68R98ST",
                "checkInDate": "2021-08-17",
                "checkOutDate": "2021-08-18",
                "rateCode": "57J",
                "rateFamilyEstimated": {
                    "code": "BAR",
                    "type": "P"
                },
                "boardType": "ROOM_ONLY",
                "room": {
                    "type": "*1K",
                    "typeEstimated": {
                        "category": "DELUXE_ROOM",
                        "beds": 1,
                        "bedType": "KING"
                    },
                    "description": {
                        "text": "BEST FLEXIBLE RATE\nDELUXE ROOM KING The Deluxe Room exudes\ntimeless elegance that combines luxury with",
                        "lang": "EN"
                    }
                },
                "guests": {
                    "adults": 3
                },
                "price": {
                    "currency": "SGD",
                    "base": "600.00",
                    "total": "706.20",
                    "taxes": [
                        {
                            "code": "MISCELLANEOUS",
                            "pricingFrequency": "PER_NIGHT",
                            "pricingMode": "PER_PRODUCT",
                            "percentage": "17.70",
                            "included": false
                        }
                    ],
                    "variations": {
                        "average": {
                            "base": "600.00"
                        },
                        "changes": [
                            {
                                "startDate": "2021-08-17",
                                "endDate": "2021-08-18",
                                "base": "600.00"
                            }
                        ]
                    }
                },
                "policies": {
                    "guarantee": {
                        "acceptedPayments": {
                            "creditCards": [
                                "AX",
                                "VI",
                                "CA",
                                "DC",
                                "CB",
                                "JC",
                                "CU"
                            ],
                            "methods": [
                                "CREDIT_CARD"
                            ]
                        }
                    },
                    "paymentType": "guarantee",
                    "cancellation": {
                        "numberOfNights": 1,
                        "deadline": "2021-08-15T18:26:00+08:00"
                    }
                },
                "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/95C68R98ST"
            }
        ],
        "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=ICSINICA&adults=3&checkInDate=2021-08-17&checkOutDate=2021-08-18"
    },
    {
        "type": "hotel-offers",
        "hotel": {
            "type": "hotel",
            "hotelId": "XRSIN533",
            "chainCode": "XR",
            "dupeId": "700052786",
            "name": "The St Regis Singapore",
            "rating": "5",
            "cityCode": "SIN",
            "latitude": 1.30636,
            "longitude": 103.82645,
            "hotelDistance": {
                "distance": 2.6,
                "distanceUnit": "KM"
            },
            "address": {
                "lines": [
                    "29 TANGLIN ROAD"
                ],
                "postalCode": "247911",
                "cityName": "SINGAPORE",
                "countryCode": "SG"
            },
            "contact": {
                "phone": "+65 650 66888",
                "fax": "+65 650 66788",
                "email": "singapore.butler@stregis.com"
            },
            "description": {
                "lang": "en",
                "text": "Located at the crossroads of the embassy district, the UNESCO World Heritage Site - Singapore Botanic Gardens and the prime shopping district of Orchard, The St. Regis Singapore is an eminent spot where luxury resides. Engage with local culture and captivating exhibits with an art tour at Singapore Art Museum, or explore the local area and see everything Orchard Road offers. A gleaming landmark of exquisite ambience, the hotel houses one of Asia's finest private art collections. Take in visual delights of the hotel's private art collections, enjoy the pleasures of the exclusive Remède Spa and experience excellent service by our staff when wining at Astor Bar or dining at Brasserie Les Saveurs, LaBrezza or Yan Ting. Admire elegance in our 299 luxuriously appointed rooms and suites, where each crystal chandelier, original art piece or lush designer fabric is meticulously selected. St. Regis Butler Service is available any time, day or night. Let The St. Regis Singapore be your home away from home."
            },
            "amenities": [
                "SPA",
                "ACCESSIBLE_FACILITIES",
                "HANDRAILS_BATHROOM",
                "ON-SITE_PARKING",
                "CONCIERGE",
                "SAFE_DEPOSIT_BOX",
                "EXCHANGE_FACILITIES",
                "BABY-SITTING",
                "FRONT_DESK",
                "24_HOUR_FRONT_DESK",
                "ONSITE_LAUNDRY",
                "ROOM_SERVICE",
                "LOUNGE",
                "FLORIST",
                "DRY_CLEANING",
                "LAUNDRY_SERVICE",
                "CAR_RENTAL",
                "WEDDING_SERVICES",
                "GYM",
                "PARKING",
                "SWIMMING_POOL",
                "OUTDOOR_POOL",
                "RESTAURANT",
                "HIGH_SPEED_INTERNET",
                "FREE_INTERNET",
                "HIGH_SPEED_WIRELESS",
                "WIRELESS_CONNECTIVITY",
                "ELEVATOR",
                "PHOTOCOPIER",
                "SECRETARIAL_SERVICES",
                "BUSINESS_CENTER",
                "MEETING_FACILITIES",
                "HIGH_SPEED_INTERNET_IN_ROOM",
                "WI-FI_IN_ROOM",
                "NON_SMOKING_ROOMS",
                "TEA/COFFEE_MAKER",
                "ALARM_CLOCK",
                "AIR_CONDITIONING",
                "SAFE",
                "HAIR_DRYER",
                "CRIBS_AVAILABLE",
                "ROLLAWAY_BEDS",
                "CABLE_TELEVISION",
                "TELEVISION",
                "MICROWAVE",
                "VOICEMAIL_IN_ROOM",
                "DIRECT_DIAL_PHONE",
                "CORDLESS_PHONE",
                "MINIBAR",
                "OUTLET_ADAPTERS",
                "BIDET",
                "REFRIGERATOR",
                "FITNESS_CENTER"
            ],
            "media": [
                {
                    "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/201C13FB63304082817E012B207C860F",
                    "category": "EXTERIOR"
                }
            ]
        },
        "available": true,
        "offers": [
            {
                "id": "G5ZC7MVTOF",
                "checkInDate": "2021-08-17",
                "checkOutDate": "2021-08-18",
                "rateCode": "RAC",
                "rateFamilyEstimated": {
                    "code": "BAR",
                    "type": "P"
                },
                "room": {
                    "type": "REG",
                    "typeEstimated": {
                        "category": "DELUXE_ROOM",
                        "beds": 1,
                        "bedType": "KING"
                    },
                    "description": {
                        "text": "Flexible Rate\nGrand Deluxe King, 1 King, Bathrooms: 1, Mini f\nridge, 52sqm/560sqft, Living/sitting area, Wire",
                        "lang": "EN"
                    }
                },
                "guests": {
                    "adults": 3
                },
                "price": {
                    "currency": "SGD",
                    "base": "349.00",
                    "total": "481.39",
                    "variations": {
                        "average": {
                            "base": "349.00"
                        },
                        "changes": [
                            {
                                "startDate": "2021-08-17",
                                "endDate": "2021-08-18",
                                "base": "349.00"
                            }
                        ]
                    }
                },
                "policies": {
                    "paymentType": "guarantee",
                    "cancellation": {
                        "description": {
                            "text": "2021-08-16T23:59:00\nCancel Penalty Amount: 373.43 "
                        },
                        "amount": "373.43",
                        "deadline": "2021-08-16T23:59:00+08:00"
                    }
                },
                "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/G5ZC7MVTOF"
            }
        ],
        "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=XRSIN533&adults=3&checkInDate=2021-08-17&checkOutDate=2021-08-18"
    },
    {
        "type": "hotel-offers",
        "hotel": {
            "type": "hotel",
            "hotelId": "RESIN711",
            "chainCode": "RE",
            "dupeId": "700011668",
            "name": "REGENT SINGAPORE",
            "rating": "5",
            "cityCode": "SIN",
            "latitude": 1.30472,
            "longitude": 103.82495,
            "hotelDistance": {
                "distance": 2.8,
                "distanceUnit": "KM"
            },
            "address": {
                "lines": [
                    "1 CUSCADEN ROAD"
                ],
                "postalCode": "249715",
                "cityName": "SINGAPORE",
                "countryCode": "SG"
            },
            "contact": {
                "phone": "65-6-7338888",
                "fax": "65-6-7328838"
            },
            "description": {
                "lang": "en",
                "text": "The Regent Singapore, is built around a sun-filled atrium that ascends through the building's 12-story interior.\r\rContemporary, yet classic in style, The Regent Singapore is decorated and furnished offers a tasteful fusion of eastern and western aesthetics. The Regent Club offers 94 executive rooms and suites over two levels. The Regent Singapore has a total of 439 rooms, including 46 elegant suites with private balconies.\r\rSome of the Regent's amazing facilities including a gymnasium with Cybex weight-training machines open from 6am to 10pm, free weights and cardio-vascular equipment. Full time fitness instructors are available to assist with individual workout programs. Spa services include Shiatsu, Swedish, Indonesian and aromatherapy massage treatments, while a sauna, whirlpool and steam bath will sooth tired muscles. \r\rThe Regent Singapore is not only home to two of Singapore's finest restaurants - Iggy's and Tenshin - it boasts an award-winning Cantonese restaurant as well."
            },
            "amenities": [
                "AUDIO-VISUAL_EQUIPMENT",
                "MEETING_ROOMS",
                "RESTAURANT",
                "DISABLED_FACILITIES",
                "ACCESSIBLE_BATH_CONTROLS",
                "WHEELCHAIR_ACCESSIBLE_LIGHT_SWITCH",
                "WHEELCHAIR_ACCESSIBLE_ELEVATORS",
                "DISABLED_ACCESSIBLE_TOILETS",
                "SERVICE_DOGS_ALLOWED",
                "ACCESSIBLE_PARKING",
                "EMERGENCY_PLAN_FOR_DISABLED",
                "HANDRAILS_BATHROOM",
                "ADAPT_ROOM_DOORS",
                "WHEELCHAIR_ACCESSIBLE_ROOM",
                "SPECIAL_NEEDS_MENU",
                "WHEELCHAIR_ACCESSIBLE_PUBLIC_AREA",
                "WIDE_ENTRANCE",
                "WIDE_CORRIDORS",
                "WIDE_RESTAURANT_ENTRANCE",
                "ADAPT_BATHROOM",
                "BABY-SITTING",
                "BEAUTY_PARLOUR",
                "KIDS_WELCOME",
                "ELEVATOR",
                "EXCHANGE_FACILITIES",
                "EXECUTIVE_FLOOR",
                "GIFT_SHOP",
                "INTERNET_HOTSPOTS",
                "FREE_INTERNET",
                "WIFI",
                "LAUNDRY_SERVICE",
                "MASSAGE",
                "NO_PORN_FILMS",
                "PARKING",
                "PETS_ALLOWED",
                "SAUNA",
                "VALET_PARKING",
                "LOUNGE",
                "HAIRDRESSER",
                "GROUP_RATES",
                "SWIMMING_POOL",
                "AIR_CONDITIONING",
                "HAIR_DRYER",
                "MINIBAR",
                "NON_SMOKING_ROOMS",
                "PC_HOOKUP_IN_ROOM",
                "ROOM_SERVICE",
                "TELEVISION",
                "WI-FI_IN_ROOM",
                "FIRST_AID_STAF",
                "INTERIOR_ROOM_ENTRY",
                "EMERGENCY_LIGHTING",
                "FIRE_DETECTORS",
                "EXTINGUISHERS",
                "FIRE_SAFETY",
                "GUARDED_PARKING",
                "RESTRICTED_PUBLIC_ACCESS",
                "SAFE_DEPOSIT_BOX",
                "SMOKE_DETECTOR",
                "SPRINKLERS",
                "VIDEO_SURVEILANCE",
                "FITNESS_CENTER"
            ],
            "media": [
                {
                    "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/82C0EE375B824AE2A42C708DC45EC208",
                    "category": "EXTERIOR"
                }
            ]
        },
        "available": true,
        "offers": [
            {
                "id": "5IXQWR91HH",
                "checkInDate": "2021-08-17",
                "checkOutDate": "2021-08-18",
                "rateCode": "N23",
                "rateFamilyEstimated": {
                    "code": "PRO",
                    "type": "P"
                },
                "boardType": "BREAKFAST",
                "room": {
                    "type": "*1K",
                    "typeEstimated": {
                        "category": "SUPERIOR_ROOM",
                        "beds": 1,
                        "bedType": "KING"
                    },
                    "description": {
                        "text": "1000 BONUS PTS BKFST Full breakfast daily for\nup to two adults sharing a room. Supplemental\nPREMIUM 1 KING BED Bathed in natural light\nthrough floor-to-ceiling windows, our elegantly",
                        "lang": "EN"
                    }
                },
                "guests": {
                    "adults": 3
                },
                "price": {
                    "currency": "SGD",
                    "base": "406.00",
                    "total": "477.86",
                    "taxes": [
                        {
                            "code": "MISCELLANEOUS",
                            "pricingFrequency": "PER_NIGHT",
                            "pricingMode": "PER_PRODUCT",
                            "percentage": "7.70",
                            "included": false
                        },
                        {
                            "code": "SERVICE_CHARGE",
                            "pricingFrequency": "PER_NIGHT",
                            "pricingMode": "PER_PRODUCT",
                            "percentage": "10.00",
                            "included": false
                        }
                    ],
                    "variations": {
                        "average": {
                            "base": "406.00"
                        },
                        "changes": [
                            {
                                "startDate": "2021-08-17",
                                "endDate": "2021-08-18",
                                "base": "406.00"
                            }
                        ]
                    }
                },
                "policies": {
                    "guarantee": {
                        "acceptedPayments": {
                            "creditCards": [
                                "AX",
                                "VI",
                                "CA",
                                "DC",
                                "CB",
                                "JC"
                            ],
                            "methods": [
                                "CREDIT_CARD"
                            ]
                        }
                    },
                    "paymentType": "guarantee",
                    "cancellation": {
                        "numberOfNights": 1,
                        "deadline": "2021-08-15T18:26:00+08:00"
                    }
                },
                "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/5IXQWR91HH"
            }
        ],
        "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=RESIN711&adults=3&checkInDate=2021-08-17&checkOutDate=2021-08-18"
    }
]