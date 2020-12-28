//
// Rubber duck debugging tools.
//
// Recommend importing as: `import * as rubberDuck from './rubber-duck'`
//
import { ItemType, ItemTypeGroup } from "item/IItem"
import { itemDescriptions, itemGroupDescriptions } from "item/Items"
import Log from "utilities/Log"

const logger = new Log("rubber-duck")

/**
 * Make the item type group descriptions use human readable strings instead of
 * numeric enumeration values.
 */
export const itemTypeGroup = {
  summarize: (itg: keyof typeof ItemTypeGroup): void => {
    const itemTypeGroupDescription = itemGroupDescriptions[ItemTypeGroup[itg]]
    logger.debug(
      `\n\nItemTypeGroup summary for ${itg}:
types: ${itemTypeGroupDescription.types
        .map((typeEnum) => `${ItemType[typeEnum]} (type enum: ${typeEnum})`)
        .join(", ")}
default: ${ItemType[itemTypeGroupDescription.default]} (type enum: ${
        itemTypeGroupDescription.default
      })\n`
    )
  },

  details: (itg: keyof typeof ItemTypeGroup): void => {
    const itemTypeGroupDescription = itemGroupDescriptions[ItemTypeGroup[itg]]
    logger.debug(
      `\n\nItemTypeGroup details for ${itg}:
${itemTypeGroupDescription.types
  .map((typeEnum) => {
    return `${ItemType[typeEnum]}: ${JSON.stringify(
      itemDescriptions[typeEnum],
      null,
      4
    )}`
  })
  .join("\n")}\n`
    )
  },
}
