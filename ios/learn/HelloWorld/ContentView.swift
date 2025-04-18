//
//  ContentView.swift
//  HelloWorld
//
//  Created by Steven Zhou on 7/21/24.
//

import SwiftUI

struct ContentView: View {
    @State private var userName : String = "";
    @State private var displayUsername : String = "";
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            TextField("Username", text: $userName).padding().border(Color.gray, width: 0.5);
            
            Button(action: { self.displayUsername = self.userName}) {
                Text("Click")
            }.padding().border(Color.gray, width: 1);
            
            Text("\(displayUsername)")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
