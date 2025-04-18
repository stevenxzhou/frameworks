//
//  Entry.swift
//  HelloWorld
//
//  Created by Steven Zhou on 7/30/24.
//

import UIKit
import SwiftData

@Model
class Entry {
    let number: Int
    let majorDescription: String
    @Attribute(.externalStorage) let image: Data?
    
    init(number: Int, majorDescription: String, image: Data) {
        self.number = number
        self.majorDescription = majorDescription
        self.image = image
    }
    
}
