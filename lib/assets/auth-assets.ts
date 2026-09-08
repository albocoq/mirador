export const authAssets = {
  heroImage:
    "https://www.figma.com/api/mcp/asset/ba51ec6c-885f-45cb-9edb-c99821b1447c.png",
  sunIcon:
    "https://www.figma.com/api/mcp/asset/aa93d158-e823-4aa4-a9d2-b13ed3df1458.svg",
  chevronIcon:
    "https://www.figma.com/api/mcp/asset/580ae223-5163-420e-bf2e-0ab096176eda.svg",
  goldenHourIcon:
    "https://www.figma.com/api/mcp/asset/e5e674ea-2d8a-4dfc-8678-fa127c25f8f9.svg",
  compassIcon:
    "https://www.figma.com/api/mcp/asset/529f6bd8-d6a2-430a-8dad-7c231d10ca21.svg",
  mountainIcon:
    "https://www.figma.com/api/mcp/asset/2070c980-f998-475a-a4ff-8bee65d7266e.svg",
  liveIcon:
    "https://www.figma.com/api/mcp/asset/f6a312d3-47f1-4cae-9064-fc8e634a0b95.svg",
  peopleIcon:
    "https://www.figma.com/api/mcp/asset/376f0405-2d78-4c87-b583-1511385d2da5.svg",
  googleIcon:
    "https://www.figma.com/api/mcp/asset/5ef6a494-5093-42dc-aaa2-48a24216a89a.svg",
  mailIcon:
    "https://www.figma.com/api/mcp/asset/03df9ec2-ba83-47c9-a92d-7c5f5d58fb6e.svg",
} as const;

export const authStats = [
  {
    icon: authAssets.mountainIcon,
    iconClass: "h-[11px] w-[20.167px]",
    value: "4.8k+",
    label: ["Vantage", "Spots"],
  },
  {
    icon: authAssets.liveIcon,
    iconClass: "size-[20.167px]",
    value: "Live",
    label: ["Solar", "Ephemeris"],
  },
  {
    icon: authAssets.peopleIcon,
    iconClass: "h-[14.667px] w-[20.167px]",
    value: "24k",
    label: ["Skywatchers"],
  },
] as const;
