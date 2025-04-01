// Copyright (C) 2025 Eray Erdin
//
// This file is part of Boykotçum.
//
// Boykotçum is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
//
// Boykotçum is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Boykotçum.  If not, see <https://www.gnu.org/licenses/>.

import React from "react";
import { View } from "react-native";

type SeparatedListProps = {
  children: React.ReactNode | React.ReactNode[];
};

const SeparatedList = ({ children }: SeparatedListProps) => {
  // Convert children to array if it's not already
  const childrenArray = React.Children.toArray(children);

  return (
    <View>
      {childrenArray.map((child, index) => (
        <View key={index}>
          <View className="p-4">{child}</View>
          {/* Only show separator if not the last child AND there are multiple children */}
          {index < childrenArray.length - 1 && childrenArray.length > 1 && (
            <View className="h-px bg-gray-300" />
          )}
        </View>
      ))}
    </View>
  );
};

export default SeparatedList;
