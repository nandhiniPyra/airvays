export const dummyData={
    "error": false,
    "status": 200,
    "message": "Success",
    "result": {
        "meta": {
            "count": 5
        },
        "data": [
            {
                "type": "flight-offer",
                "id": "1",
                "source": "GDS",
                "instantTicketingRequired": false,
                "nonHomogeneous": false,
                "oneWay": false,
                "lastTicketingDate": "2021-08-28",
                "numberOfBookableSeats": 4,
                "itineraries": [
                    {
                        "duration": "PT25H5M",
                        "segments": [
                            {
                                "departure": {
                                    "iataCode": "MAA",
                                    "terminal": "1",
                                    "at": "2021-08-28T14:55:00"
                                },
                                "arrival": {
                                    "iataCode": "BOM",
                                    "terminal": "2",
                                    "at": "2021-08-28T17:05:00"
                                },
                                "carrierCode": "AI",
                                "number": "672",
                                "aircraft": {
                                    "code": "32B"
                                },
                                "operating": {
                                    "carrierCode": "AI"
                                },
                                "duration": "PT2H10M",
                                "id": "1",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "BOM",
                                    "terminal": "2",
                                    "at": "2021-08-29T01:00:00"
                                },
                                "arrival": {
                                    "iataCode": "NBO",
                                    "terminal": "1A",
                                    "at": "2021-08-29T04:45:00"
                                },
                                "carrierCode": "KQ",
                                "number": "213",
                                "aircraft": {
                                    "code": "738"
                                },
                                "operating": {
                                    "carrierCode": "KQ"
                                },
                                "duration": "PT6H15M",
                                "id": "2",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "NBO",
                                    "terminal": "1A",
                                    "at": "2021-08-29T08:15:00"
                                },
                                "arrival": {
                                    "iataCode": "LOS",
                                    "terminal": "I",
                                    "at": "2021-08-29T11:30:00"
                                },
                                "carrierCode": "KQ",
                                "number": "532",
                                "aircraft": {
                                    "code": "738"
                                },
                                "operating": {
                                    "carrierCode": "KQ"
                                },
                                "duration": "PT5H15M",
                                "id": "3",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            }
                        ]
                    }
                ],
                "price": {
                    "currency": "USD",
                    "total": "2723.00",
                    "base": "2112.00",
                    "fees": [
                        {
                            "amount": "0.00",
                            "type": "SUPPLIER"
                        },
                        {
                            "amount": "0.00",
                            "type": "TICKETING"
                        }
                    ],
                    "grandTotal": "2723.00"
                },
                "pricingOptions": {
                    "fareType": [
                        "PUBLISHED"
                    ],
                    "includedCheckedBagsOnly": true
                },
                "validatingAirlineCodes": [
                    "KQ"
                ],
                "travelerPricings": [
                    {
                        "travelerId": "1",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "1361.50",
                            "base": "1056.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "1",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "2",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "3",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            }
                        ]
                    },
                    {
                        "travelerId": "2",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "1361.50",
                            "base": "1056.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "1",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "2",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "3",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "type": "flight-offer",
                "id": "2",
                "source": "GDS",
                "instantTicketingRequired": false,
                "nonHomogeneous": false,
                "oneWay": false,
                "lastTicketingDate": "2021-08-28",
                "numberOfBookableSeats": 4,
                "itineraries": [
                    {
                        "duration": "PT27H30M",
                        "segments": [
                            {
                                "departure": {
                                    "iataCode": "MAA",
                                    "terminal": "1",
                                    "at": "2021-08-28T12:30:00"
                                },
                                "arrival": {
                                    "iataCode": "BOM",
                                    "terminal": "2",
                                    "at": "2021-08-28T14:30:00"
                                },
                                "carrierCode": "UK",
                                "number": "826",
                                "aircraft": {
                                    "code": "320"
                                },
                                "operating": {
                                    "carrierCode": "UK"
                                },
                                "duration": "PT2H",
                                "id": "10",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "BOM",
                                    "terminal": "2",
                                    "at": "2021-08-29T01:00:00"
                                },
                                "arrival": {
                                    "iataCode": "NBO",
                                    "terminal": "1A",
                                    "at": "2021-08-29T04:45:00"
                                },
                                "carrierCode": "KQ",
                                "number": "213",
                                "aircraft": {
                                    "code": "738"
                                },
                                "operating": {
                                    "carrierCode": "KQ"
                                },
                                "duration": "PT6H15M",
                                "id": "11",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "NBO",
                                    "terminal": "1A",
                                    "at": "2021-08-29T08:15:00"
                                },
                                "arrival": {
                                    "iataCode": "LOS",
                                    "terminal": "I",
                                    "at": "2021-08-29T11:30:00"
                                },
                                "carrierCode": "KQ",
                                "number": "532",
                                "aircraft": {
                                    "code": "738"
                                },
                                "operating": {
                                    "carrierCode": "KQ"
                                },
                                "duration": "PT5H15M",
                                "id": "12",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            }
                        ]
                    }
                ],
                "price": {
                    "currency": "USD",
                    "total": "2726.92",
                    "base": "2112.00",
                    "fees": [
                        {
                            "amount": "0.00",
                            "type": "SUPPLIER"
                        },
                        {
                            "amount": "0.00",
                            "type": "TICKETING"
                        }
                    ],
                    "grandTotal": "2726.92"
                },
                "pricingOptions": {
                    "fareType": [
                        "PUBLISHED"
                    ],
                    "includedCheckedBagsOnly": true
                },
                "validatingAirlineCodes": [
                    "KQ"
                ],
                "travelerPricings": [
                    {
                        "travelerId": "1",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "1363.46",
                            "base": "1056.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "10",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "11",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "12",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            }
                        ]
                    },
                    {
                        "travelerId": "2",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "1363.46",
                            "base": "1056.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "10",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "11",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            },
                            {
                                "segmentId": "12",
                                "cabin": "BUSINESS",
                                "fareBasis": "DSFWIA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 2
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "type": "flight-offer",
                "id": "3",
                "source": "GDS",
                "instantTicketingRequired": false,
                "nonHomogeneous": false,
                "oneWay": false,
                "lastTicketingDate": "2021-08-28",
                "numberOfBookableSeats": 4,
                "itineraries": [
                    {
                        "duration": "PT23H30M",
                        "segments": [
                            {
                                "departure": {
                                    "iataCode": "MAA",
                                    "terminal": "4",
                                    "at": "2021-08-28T17:25:00"
                                },
                                "arrival": {
                                    "iataCode": "DXB",
                                    "terminal": "1",
                                    "at": "2021-08-28T20:00:00"
                                },
                                "carrierCode": "AI",
                                "number": "905",
                                "aircraft": {
                                    "code": "321"
                                },
                                "operating": {
                                    "carrierCode": "AI"
                                },
                                "duration": "PT4H5M",
                                "id": "7",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "DXB",
                                    "terminal": "3",
                                    "at": "2021-08-29T04:25:00"
                                },
                                "arrival": {
                                    "iataCode": "ADD",
                                    "terminal": "2",
                                    "at": "2021-08-29T07:40:00"
                                },
                                "carrierCode": "ET",
                                "number": "601",
                                "aircraft": {
                                    "code": "350"
                                },
                                "operating": {
                                    "carrierCode": "ET"
                                },
                                "duration": "PT4H15M",
                                "id": "8",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "ADD",
                                    "terminal": "2",
                                    "at": "2021-08-29T09:00:00"
                                },
                                "arrival": {
                                    "iataCode": "LOS",
                                    "terminal": "I",
                                    "at": "2021-08-29T12:25:00"
                                },
                                "carrierCode": "ET",
                                "number": "901",
                                "aircraft": {
                                    "code": "77L"
                                },
                                "operating": {
                                    "carrierCode": "ET"
                                },
                                "duration": "PT5H25M",
                                "id": "9",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            }
                        ]
                    }
                ],
                "price": {
                    "currency": "USD",
                    "total": "4609.24",
                    "base": "3650.00",
                    "fees": [
                        {
                            "amount": "0.00",
                            "type": "SUPPLIER"
                        },
                        {
                            "amount": "0.00",
                            "type": "TICKETING"
                        }
                    ],
                    "grandTotal": "4609.24"
                },
                "pricingOptions": {
                    "fareType": [
                        "PUBLISHED"
                    ],
                    "includedCheckedBagsOnly": true
                },
                "validatingAirlineCodes": [
                    "AI"
                ],
                "travelerPricings": [
                    {
                        "travelerId": "1",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "2304.62",
                            "base": "1825.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "7",
                                "cabin": "BUSINESS",
                                "fareBasis": "ZOWINET",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "weight": 40,
                                    "weightUnit": "KG"
                                }
                            },
                            {
                                "segmentId": "8",
                                "cabin": "BUSINESS",
                                "fareBasis": "ZOWINET",
                                "class": "D",
                                "includedCheckedBags": {
                                    "weight": 40,
                                    "weightUnit": "KG"
                                }
                            },
                            {
                                "segmentId": "9",
                                "cabin": "BUSINESS",
                                "fareBasis": "ZOWINET",
                                "class": "D",
                                "includedCheckedBags": {
                                    "weight": 40,
                                    "weightUnit": "KG"
                                }
                            }
                        ]
                    },
                    {
                        "travelerId": "2",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "2304.62",
                            "base": "1825.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "7",
                                "cabin": "BUSINESS",
                                "fareBasis": "ZOWINET",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "weight": 40,
                                    "weightUnit": "KG"
                                }
                            },
                            {
                                "segmentId": "8",
                                "cabin": "BUSINESS",
                                "fareBasis": "ZOWINET",
                                "class": "D",
                                "includedCheckedBags": {
                                    "weight": 40,
                                    "weightUnit": "KG"
                                }
                            },
                            {
                                "segmentId": "9",
                                "cabin": "BUSINESS",
                                "fareBasis": "ZOWINET",
                                "class": "D",
                                "includedCheckedBags": {
                                    "weight": 40,
                                    "weightUnit": "KG"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "type": "flight-offer",
                "id": "4",
                "source": "GDS",
                "instantTicketingRequired": false,
                "nonHomogeneous": false,
                "oneWay": false,
                "lastTicketingDate": "2021-08-28",
                "numberOfBookableSeats": 4,
                "itineraries": [
                    {
                        "duration": "PT19H50M",
                        "segments": [
                            {
                                "departure": {
                                    "iataCode": "MAA",
                                    "terminal": "1",
                                    "at": "2021-08-28T21:05:00"
                                },
                                "arrival": {
                                    "iataCode": "DEL",
                                    "terminal": "3",
                                    "at": "2021-08-28T23:55:00"
                                },
                                "carrierCode": "UK",
                                "number": "838",
                                "aircraft": {
                                    "code": "320"
                                },
                                "operating": {
                                    "carrierCode": "UK"
                                },
                                "duration": "PT2H50M",
                                "id": "13",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "DEL",
                                    "terminal": "3",
                                    "at": "2021-08-29T02:40:00"
                                },
                                "arrival": {
                                    "iataCode": "ADD",
                                    "terminal": "2",
                                    "at": "2021-08-29T07:00:00"
                                },
                                "carrierCode": "ET",
                                "number": "687",
                                "aircraft": {
                                    "code": "787"
                                },
                                "operating": {
                                    "carrierCode": "ET"
                                },
                                "duration": "PT6H50M",
                                "id": "14",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "ADD",
                                    "terminal": "2",
                                    "at": "2021-08-29T09:00:00"
                                },
                                "arrival": {
                                    "iataCode": "LOS",
                                    "terminal": "I",
                                    "at": "2021-08-29T12:25:00"
                                },
                                "carrierCode": "ET",
                                "number": "901",
                                "aircraft": {
                                    "code": "77L"
                                },
                                "operating": {
                                    "carrierCode": "ET"
                                },
                                "duration": "PT5H25M",
                                "id": "15",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            }
                        ]
                    }
                ],
                "price": {
                    "currency": "USD",
                    "total": "4812.36",
                    "base": "3790.00",
                    "fees": [
                        {
                            "amount": "0.00",
                            "type": "SUPPLIER"
                        },
                        {
                            "amount": "0.00",
                            "type": "TICKETING"
                        }
                    ],
                    "grandTotal": "4812.36"
                },
                "pricingOptions": {
                    "fareType": [
                        "PUBLISHED"
                    ],
                    "includedCheckedBagsOnly": true
                },
                "validatingAirlineCodes": [
                    "ET"
                ],
                "travelerPricings": [
                    {
                        "travelerId": "1",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "2406.18",
                            "base": "1895.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "13",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "14",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "15",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            }
                        ]
                    },
                    {
                        "travelerId": "2",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "2406.18",
                            "base": "1895.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "13",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "14",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "15",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "type": "flight-offer",
                "id": "5",
                "source": "GDS",
                "instantTicketingRequired": false,
                "nonHomogeneous": false,
                "oneWay": false,
                "lastTicketingDate": "2021-08-28",
                "numberOfBookableSeats": 4,
                "itineraries": [
                    {
                        "duration": "PT30H5M",
                        "segments": [
                            {
                                "departure": {
                                    "iataCode": "MAA",
                                    "terminal": "1",
                                    "at": "2021-08-28T10:50:00"
                                },
                                "arrival": {
                                    "iataCode": "DEL",
                                    "terminal": "3",
                                    "at": "2021-08-28T13:35:00"
                                },
                                "carrierCode": "UK",
                                "number": "836",
                                "aircraft": {
                                    "code": "320"
                                },
                                "operating": {
                                    "carrierCode": "UK"
                                },
                                "duration": "PT2H45M",
                                "id": "4",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "DEL",
                                    "terminal": "3",
                                    "at": "2021-08-29T02:40:00"
                                },
                                "arrival": {
                                    "iataCode": "ADD",
                                    "terminal": "2",
                                    "at": "2021-08-29T07:00:00"
                                },
                                "carrierCode": "ET",
                                "number": "687",
                                "aircraft": {
                                    "code": "787"
                                },
                                "operating": {
                                    "carrierCode": "ET"
                                },
                                "duration": "PT6H50M",
                                "id": "5",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "ADD",
                                    "terminal": "2",
                                    "at": "2021-08-29T09:00:00"
                                },
                                "arrival": {
                                    "iataCode": "LOS",
                                    "terminal": "I",
                                    "at": "2021-08-29T12:25:00"
                                },
                                "carrierCode": "ET",
                                "number": "901",
                                "aircraft": {
                                    "code": "77L"
                                },
                                "operating": {
                                    "carrierCode": "ET"
                                },
                                "duration": "PT5H25M",
                                "id": "6",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            }
                        ]
                    }
                ],
                "price": {
                    "currency": "USD",
                    "total": "4812.36",
                    "base": "3790.00",
                    "fees": [
                        {
                            "amount": "0.00",
                            "type": "SUPPLIER"
                        },
                        {
                            "amount": "0.00",
                            "type": "TICKETING"
                        }
                    ],
                    "grandTotal": "4812.36"
                },
                "pricingOptions": {
                    "fareType": [
                        "PUBLISHED"
                    ],
                    "includedCheckedBagsOnly": true
                },
                "validatingAirlineCodes": [
                    "ET"
                ],
                "travelerPricings": [
                    {
                        "travelerId": "1",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "2406.18",
                            "base": "1895.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "4",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "5",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "6",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            }
                        ]
                    },
                    {
                        "travelerId": "2",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "USD",
                            "total": "2406.18",
                            "base": "1895.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "4",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "Z",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "5",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            },
                            {
                                "segmentId": "6",
                                "cabin": "BUSINESS",
                                "fareBasis": "DOWINA",
                                "class": "D",
                                "includedCheckedBags": {
                                    "quantity": 3
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        "dictionaries": {
            "locations": {
                "BOM": {
                    "cityCode": "BOM",
                    "countryCode": "IN"
                },
                "LOS": {
                    "cityCode": "LOS",
                    "countryCode": "NG"
                },
                "ADD": {
                    "cityCode": "ADD",
                    "countryCode": "ET"
                },
                "NBO": {
                    "cityCode": "NBO",
                    "countryCode": "KE"
                },
                "DEL": {
                    "cityCode": "DEL",
                    "countryCode": "IN"
                },
                "MAA": {
                    "cityCode": "MAA",
                    "countryCode": "IN"
                },
                "DXB": {
                    "cityCode": "DXB",
                    "countryCode": "AE"
                }
            },
            "aircraft": {
                "320": "AIRBUS A320",
                "321": "AIRBUS A321",
                "350": "AIRBUS INDUSTRIE A350",
                "738": "BOEING 737-800",
                "787": "787  ALL SERIES PASSENGER",
                "32B": "AIRBUS A321 (SHARKLETS)",
                "77L": "BOEING 777-200LR"
            },
            "currencies": {
                "USD": "US DOLLAR"
            },
            "carriers": {
                "KQ": "KENYA AIRWAYS",
                "UK": "VISTARA",
                "AI": "AIR INDIA",
                "ET": "ETHIOPIAN AIRLINES"
            }
        }
    }
}