export interface TourBannerEvent {
    id: number;
    bannerImageUrl: string;
    mobileBannerImageUrl: string;
    eventTitle: string;
    eventCity: string;
    eventDate: string;
    ticketLink: string;
}

export const tourBannerEvents: TourBannerEvent[] = [
    {
        id: 1,
        bannerImageUrl: "/images/banners/sanam-hyd-landscape.jpg",
        mobileBannerImageUrl: "/images/banners/sanam-mum-ver.jpg",
        eventTitle: "Sanam India Tour - Mumbai",
        eventCity: "Mumbai",
        eventDate: "14 Feb 2026",
        ticketLink: "https://in.bookmyshow.com/events/sanam-india-tour-mumbai/ET00466356" 
    },
    {
        id: 2,
        bannerImageUrl: "/images/banners/sanam-hyd-landscape.jpg",
        mobileBannerImageUrl: "/images/banners/sanam-beng-ver.jpg",
        eventTitle: "Sanam India Tour - Bengaluru",
        eventCity: "Bangalore",
        eventDate: "14 Mar 2026",
        ticketLink: "https://in.bookmyshow.com/events/sanam-india-tour-bengaluru/ET00466355"      
    },
    {
        id: 3,
        bannerImageUrl: "/images/banners/sanam-hyd-landscape.jpg", 
        mobileBannerImageUrl: "/images/banners/sanam-hyd-ver.jpg",
        eventTitle: "Sanam India Tour - Hyderabad",
        eventCity: "Hyderabad",
        eventDate: "17 Jan 2026",
        ticketLink: "https://in.bookmyshow.com/events/sanam-india-tour-hyderabad/ET00466352"  
          
    },
    {
        id: 4,
        bannerImageUrl: "/images/banners/sanam-jaipur-landscape.jpg", 
        mobileBannerImageUrl: "/images/banners/sanam-dehra-ver.jpg",
        eventTitle: "McDowell's Soda Yaari Jam - Ft.Sanam - Dehradun",
        eventCity: "Dehradun",
        eventDate: "8 Feb 2026",
        ticketLink: "https://in.bookmyshow.com/events/mcdowell-s-soda-yaari-jam-ft-sanam-dehradun/ET00466353"  
    },
    {
        id: 5,
        bannerImageUrl: "/images/banners/sanam-jaipur-landscape.jpg", 
        mobileBannerImageUrl: "/images/banners/sanam-jaipur-vertical.jpg",
        eventTitle: "McDowell's Soda Yaari Jam - Ft.Sanam - Jaipur",
        eventCity: "Jaipur",
        eventDate: "13 Dec 2025",
        ticketLink: "https://in.bookmyshow.com/events/mcdowell-s-soda-yaari-jam-ft-sanam-jaipur/ET00466351"  
    },
    {
        id: 6,
        bannerImageUrl: "/images/banners/sanam-jaipur-landscape.jpg", 
        mobileBannerImageUrl: "/images/banners/sanam-luc-ver.jpg",
        eventTitle: "McDowell's Soda Yaari Jam - Ft.Sanam - Lucknow",
        eventCity: "Lucknow",
        eventDate: "18 Jan 2026",
        ticketLink: "https://in.bookmyshow.com/events/mcdowell-s-soda-yaari-jam-ft-sanam-lucknow/ET00466354"  
    },
]