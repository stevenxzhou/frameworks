//
//  LocationViewModel.swift
//  HelloWorld
//
//  Created by Steven Zhou on 1/8/25.
//

import CoreLocation
import Combine

class LocationViewModel: NSObject, ObservableObject, CLLocationManagerDelegate {
    private let locationManager = CLLocationManager()
    @Published var location: Location?
    @Published var errorMessage: String?

    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last {
            self.location = Location(latitude: location.coordinate.latitude, longitude: location.coordinate.longitude)
            locationManager.stopUpdatingLocation()
        }
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        self.errorMessage = "Failed to get location: \(error.localizedDescription)"
    }
}
