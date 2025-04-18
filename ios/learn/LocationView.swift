//
//  LocationView.swift
//  HelloWorld
//
//  Created by Steven Zhou on 1/8/25.
//

import SwiftUI

struct LocationView: View {
    @StateObject private var viewModel = LocationViewModel()

    var body: some View {
        VStack {
            if let location = viewModel.location {
                Text("Latitude: \(location.latitude), Longitude: \(location.longitude)")
            } else if let errorMessage = viewModel.errorMessage {
                Text(errorMessage)
            } else {
                Text("Fetching location...")
            }
        }
        .padding()
    }
}

#Preview {
    LocationView()
}
