<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const props = defineProps<{
  cards: Array<{
    title: string
    classname?: string
    tags?: string[]
    details?: string
    relationships?: string[]
    logo?: string
    link?: string
    githubLink?: string
    backgroundColor?: string
    headingColor?: string
    headinBackgroundColor?: string
  }>
  relationships_logos: Record<string, string>
}>()

const tagColorMap: Record<string, string> = {
  application: "#d64545",
  data: "#ff6c00",
  ai: "#7c3aed",
  service_orchestration: "#ec4899",
  cloud_edge_platform: "#00a6b2",
  virtualization: "#20a464",
  management: "#84cc16",
  sustainability: "#f5a623",
  compliance: "#00a99d",
}

const iconMap: Record<string, string> = {
  application: `<svg viewBox="0 0 340.80839 333.29516" width="14" height="14" fill="currentColor"><rect x="177.57452" y="170.45206" width="160.11145" height="160.11145" rx="27.00909" ry="27.00909"/><rect x="177.57452" y="2.51499" width="160.11145" height="160.11145" rx="27.00909" ry="27.00909"/><rect x="3.15924" y="170.45206" width="160.11145" height="160.11145" rx="27.00909" ry="27.00909"/><rect x="3.15924" y="2.51499" width="160.11145" height="160.11145" rx="27.00909" ry="27.00909"/></svg>`,
  data: `<svg viewBox="0 0 384 384" width="14" height="14" fill="currentColor"><path d="M192,28 C265,28 322,42 322,60 C322,78 265,92 192,92 C119,92 62,78 62,60 C62,42 119,28 192,28 Z M62,85 C62,103 119,117 192,117 C265,117 322,103 322,85 L322,125 C322,143 265,157 192,157 C119,157 62,143 62,125 Z M62,150 C62,168 119,182 192,182 C265,182 322,168 322,150 L322,190 C322,208 265,222 192,222 C119,222 62,208 62,190 Z M62,215 C62,233 119,247 192,247 C265,247 322,233 322,215 L322,290 C322,326 265,356 192,356 C119,356 62,326 62,290 Z"/></svg>`,
  ai: `<svg viewBox="0 0 340.80839 333.29516" width="14" height="14" fill="currentColor"><circle cx="170.85453" cy="38.53928" r="33.37432"/><circle cx="170.85453" cy="296.81014" r="33.37432"/><circle cx="301.51888" cy="168.38658" r="33.37432"/><circle cx="40.05189" cy="168.38658" r="33.37432"/><path d="M164.43728,90.63033c-13.60975,32.27182-39.76499,57.95522-72.35898,70.9405-5.79126,2.30721-5.79125,10.62386.00001,12.93106,32.59398,12.98523,58.74922,38.66847,72.35897,70.94041,2.40665,5.70673,10.46962,5.70677,12.87632.00006,13.6101-32.27197,39.76541-57.95523,72.35942-70.94047,5.79126-2.3072,5.79127-10.62385.00001-12.93106-32.59402-12.9853-58.74934-38.66871-72.35944-70.94056-2.4067-5.7067-10.46966-5.70666-12.87631.00006Z"/><circle cx="260.396" cy="257.41884" r="28.5079"/><circle cx="260.44619" cy="87.46904" r="28.5079"/><circle cx="80.51804" cy="257.41884" r="28.5079"/><circle cx="80.56823" cy="87.46904" r="28.5079"/></svg>`,
  service_orchestration: `<svg viewBox="0 0 340.80839 333.29516" width="14" height="14" fill="currentColor"><path d="M238.06889,165.95207c-.42139-37.1936-30.62061-67.229-67.88135-67.36719-.08594-.00024-.1709-.00659-.25684-.00659-37.37939,0-67.71582,30.09424-68.1377,67.37378-.00342.26221-.02002.52124-.02002.78418,0,37.64233,30.51514,68.15771,68.15771,68.15771.08594,0,.1709-.0061.25684-.00659,37.52344-.13916,67.90088-30.59473,67.90088-68.15112,0-.26294-.0166-.52197-.01953-.78418Z"/><path d="M214.04936,43.36858c35.80811,13.18896,64.13916,41.95508,76.75049,78.03589,3.08008-.66113,6.27246-1.01733,9.54785-1.01733.50098,0,.99658.02173,1.49365.03784-13.56445-41.40869-46.11279-74.29883-87.31543-88.31787.09912,1.22314.16357,2.45557.16357,3.70361,0,2.57568-.22656,5.0979-.64014,7.55786Z"/><path d="M49.16606,121.10906c12.50684-35.50146,40.24756-63.87695,75.33887-77.24268-.47021-2.6167-.72949-5.30566-.72949-8.05566,0-1.07593.05078-2.13965.125-3.19702-40.38184,14.24023-72.25586,46.66138-85.74268,87.38916.32324-.00684.64404-.02466.96924-.02466,3.4502,0,6.80713.39917,10.03906,1.13086Z"/><path d="M50.46098,209.46257c-3.51367.90503-7.19238,1.39209-10.97803,1.42139,14.16113,38.88745,45.24463,69.70557,84.29688,83.51758.01465-3.77881.49365-7.44995,1.38135-10.96045-34.2334-12.82251-61.5542-39.90356-74.7002-73.97852Z"/><path d="M213.4141,283.91765c.82617,3.42236,1.27539,6.99023,1.27539,10.6626,0,.10596-.00732.20972-.00781.31543,39.5708-13.51685,71.14648-44.44067,85.54736-83.59692-3.79395-.00977-7.479-.48877-11.00342-1.37842-13.37891,34.28564-41.13037,61.43237-75.81152,73.99731Z"/><path d="M202.08158,28.52385c-3.55176-14.40234-16.4502-25.11621-31.89404-25.34619-.16895-.00244-.33545-.0127-.50488-.0127-15.71387,0-28.8833,10.86328-32.42822,25.48755-.61279,2.52954-.9458,5.1687-.9458,7.88672,0,1.15942.05957,2.30469.1748,3.43359,1.71924,16.81909,15.92676,29.94092,33.19922,29.94092.16943,0,.33594-.01025.50488-.01294,17.08789-.25415,31.06348-13.34253,32.70557-30.05933.10693-1.08643.16406-2.1875.16406-3.30225,0-2.76392-.34229-5.44702-.97559-8.01538Z"/><path d="M202.22074,287.39861c-3.33594-14.70508-16.37451-25.71704-32.0332-25.94995-.16895-.00269-.33545-.01294-.50488-.01294-15.83838,0-29.08984,11.03687-32.50879,25.83643-.55957,2.42358-.86523,4.94434-.86523,7.53809,0,1.14966.05811,2.28589.17188,3.40576,1.70605,16.83228,15.91992,29.96851,33.20215,29.96851.16943,0,.33594-.01025.50488-.01294,17.00977-.25293,30.93555-13.22314,32.68213-29.83057.12207-1.1604.1875-2.33789.1875-3.53076,0-2.54858-.29541-5.02686-.83643-7.41162Z"/><path d="M333.71049,165.95207c-.21143-16.51929-12.41699-30.14624-28.3125-32.55933-1.64746-.25-3.33398-.38037-5.05078-.38037-2.03906,0-4.03223.19263-5.97021.54297-15.44336,2.79077-27.18555,16.19873-27.39307,32.39673-.00195.14526-.01123.28882-.01123.43457,0,15.8877,11.10547,29.1731,25.97461,32.54077,2.38135.53931,4.85547.8335,7.3999.8335,1.21729,0,2.41748-.06934,3.60107-.19629,16.73779-1.79639,29.77344-15.96289,29.77344-33.17798,0-.14575-.00928-.28931-.01123-.43457Z"/><path d="M72.24369,165.95207c-.20508-15.9856-11.64209-29.2605-26.78564-32.28833-2.12695-.42529-4.32568-.65137-6.57764-.65137-1.49219,0-2.9585.10767-4.39893.29736-16.21094,2.13599-28.75,15.89893-28.96484,32.64233-.00146.14526-.01074.28882-.01074.43457,0,17.43677,13.37451,31.74219,30.42334,33.23706.97314.08545,1.95557.13721,2.95117.13721,2.75586,0,5.43115-.34058,7.99268-.97046,14.57129-3.58252,25.38135-16.72778,25.38135-32.40381,0-.14575-.00879-.28931-.01074-.43457Z"/></svg>`,
  cloud_edge_platform: `<svg viewBox="0 20 340.80839 270" width="14" height="14" fill="currentColor"><path d="M257.05378,81.78125c-1.49303,0-2.95508.13784-4.42953.22457-13.90191-32.85286-46.43262-55.905-84.3531-55.905-45.08208,0-82.46978,32.61899-90.05264,75.52657-2.09396-.20134-4.2127-.3206-6.36241-.3206-36.21063,0-65.56323,29.3526-65.56323,65.56323s29.3526,65.56323,65.56323,65.56323c24.13009,0,161.58799-.54208,185.19769-.54208,41.45172,0,75.05419-33.60247,75.05419-75.05419s-33.60247-75.05574-75.05419-75.05574Z"/><circle cx="75.15699" cy="285.48143" r="24.98186"/><circle cx="167.79768" cy="285.48143" r="24.98186"/><circle cx="261.47928" cy="285.48143" r="24.98186"/><line x1="74.32429" y1="270.28423" x2="74.32429" y2="216.15708" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="12.68766"/><line x1="168.52634" y1="270.28423" x2="168.52634" y2="216.15708" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="12.68766"/><line x1="260.12613" y1="270.28423" x2="260.12613" y2="216.15708" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="12.68766"/></svg>`,
  virtualization: `<svg viewBox="0 0 340.80839 333.29516" width="14" height="14" fill="currentColor"><path d="M300.24256,68.20041L179.23863,4.01143c-1.73103-.91811-3.63013-1.37716-5.52923-1.37716s-3.79706.45905-5.52809,1.37716L47.17739,68.20041c-3.81192,2.0223-6.15464,5.80449-6.26669,10.11806-.11205,4.31385,2.03173,8.21295,5.73389,10.42962l49.07363,29.38232,3.52094,2.10805,3.52094,2.10833,64.88842,38.85153c1.85222,1.10905,3.92683,1.66471,6.00315,1.675.03887-.00029.07775-.00029.11605,0,2.07689-.01058,4.1515-.56653,6.00372-1.675l64.88842-38.85153,3.52094-2.10805,3.52094-2.10833,49.07363-29.38232c3.70216-2.21667,5.84479-6.11548,5.73389-10.42876-.11205-4.31385-2.45477-8.09662-6.26669-10.11891Z"/><path d="M173.7094,253.53509c-3.34315,0-6.68744-.89267-9.66929-2.67829l-68.53055-41.03218-48.33217,25.63872c-3.81192,2.0223-6.15464,5.80478-6.26669,10.11834s2.03173,8.21267,5.73389,10.42933l121.00393,72.45024c3.73875,2.23925,8.38417,2.23782,12.12292,0l121.00393-72.45024c3.70216-2.21638,5.84479-6.1152,5.73389-10.42848-.11205-4.31385-2.45477-8.09662-6.26669-10.1192l-48.33217-25.63872-68.53055,41.03218c-2.98185,1.78562-6.32614,2.67829-9.67044,2.67829Z"/><path d="M173.6408,169.90148c.02287,0,.04573.00229.0686.00229s.04573-.00229.0686-.00229c-.02287-.00029-.04573-.00429-.0686-.00429s-.04573.004-.0686.00429Z"/><path d="M173.65166,162.87332h.11605c-.0383-.00029-.07718-.00029-.11605,0Z" fill="#ed1e79"/><path d="M300.24256,151.83201l-48.33217-25.639-67.01962,40.12751-1.51093.90467c-.70659.42304-1.4349.79205-2.17693,1.11505-2.36959,1.03016-4.89582,1.55181-7.4249,1.56124-.02287,0-.04573.00229-.0686.00229s-.04573-.00229-.0686-.00229c-2.52794-.00943-5.05417-.53109-7.42376-1.56124-.74203-.323-1.47035-.69173-2.17693-1.11476l-1.51093-.90496-67.01962-40.12751-48.33217,25.639c-3.81192,2.02201-6.15464,5.80449-6.26669,10.11806-.11205,4.31385,2.03173,8.21267,5.73389,10.42962l49.07306,29.38204,3.52151,2.10833,3.52094,2.10833,64.88842,38.85124c3.73875,2.23896,8.38417,2.2381,12.12292,0l64.88842-38.85124,3.52094-2.10805,3.52094-2.10833,49.07363-29.38232c3.70216-2.21667,5.84479-6.1152,5.73389-10.42905-.11205-4.31385-2.45477-8.09633-6.26669-10.11863Z"/></svg>`,
  management: `<svg viewBox="0 0 340.80839 333.29516" width="14" height="14" fill="currentColor"><path d="M303.04888,132.71439h-17.58783c-2.19848-6.99367-5.01453-13.71268-8.37672-20.09984l14.91274-14.91274c8.55055-8.55024,8.55055-22.41305,0-30.96328l-20.603-20.603c-8.54992-8.55024-22.41273-8.55024-30.96328,0l-15.00693,15.00756c-5.59986-2.92067-11.45131-5.42256-17.51893-7.457v-24.67885c0-12.09195-9.80213-21.8944-21.89377-21.8944h-29.13712c-12.09164,0-21.8944,9.80245-21.8944,21.8944v23.2212c-5.78634,1.68363-11.39442,3.78413-16.79074,6.26737l-18.0695-18.06919c-8.54992-8.55024-22.41273-8.55024-30.96328,0l-21.12323,21.12291c-8.54992,8.55024-8.54992,22.41305,0,30.96328l15.59289,15.59258c-4.48293,7.707-8.14727,15.94909-10.86977,24.609h-20.76988c-12.09164,0-21.8944,9.80245-21.8944,21.8944v29.87226c0,12.09195,9.80276,21.8944,21.8944,21.8944h20.90894c1.91403,6.00916,4.28191,11.81509,7.06193,17.37987l-13.3508,13.3508c-8.55055,8.55024-8.55055,22.41305,0,30.96328l20.60237,20.603c8.55055,8.55024,22.41336,8.55024,30.96328,0l12.36091-12.36091c7.6833,4.21586,15.86976,7.62578,24.44686,10.12135v15.79959c0,12.09195,9.80276,21.8944,21.8944,21.8944h29.13712c12.09164,0,21.89377-9.80245,21.89377-21.8944v-17.25692c6.62578-2.22187,12.99682-4.99651,19.06002-8.27021l12.09922,12.09985c8.55055,8.55024,22.41336,8.55024,30.96328,0l21.12323-21.12323c8.55055-8.55024,8.55055-22.41305,0-30.96328l-12.91464-12.91464c2.79077-5.57964,5.16687-11.40169,7.08595-17.42854h17.7269c12.09164,0,21.89377-9.80245,21.89377-21.8944v-29.87226c0-12.09195-9.80213-21.8944-21.89377-21.8944ZM92.01068,169.33063c0-.15044.01075-.29867.01138-.44911.2421-42.57104,34.69779-77.02768,77.26851-77.27199.15171-.00063.30088-.01138.45259-.01138,42.77995,0,77.47837,34.56062,77.72111,77.28337.00126.15044.01138.29867.01138.44911,0,42.93071-34.80209,77.73248-77.73248,77.73248-.15171,0-.30088-.01043-.45259-.01138-42.72117-.24494-77.27989-34.94242-77.27989-77.72111Z"/></svg>`,
  sustainability: `<svg viewBox="0 0 340.80839 333.29516" width="14" height="14" fill="currentColor"><path d="M68.70588,295.35876s-85.80591-88.70513-11.74184-196.99971C82.77914,60.61289,126.25512,18.04628,233.55398,12.45043c19.10299-.99626,41.45387-4.4991,54.41042-6.75914,6.15663-1.07391,12.02515,2.98102,13.2216,9.11501,6.35867,32.59981,20.44046,130.57218-20.72229,207.61017-51.2829,95.97832-143.32207,97.19005-170.64705,95.25576-4.47365-.31668-7.85893-4.16349-7.62484-8.64223.74122-14.18135,3.85083-45.56135,16.81043-76.7822,8.5759-20.66011,25.30342-44.45992,36.44942-63.25952,3.35681-5.66183-4.14055-11.45296-8.79453-6.79839-9.75495,9.75619-20.55649,22.18263-29.70869,36.67361-15.67108,24.81254-28.28031,69.27715-30.36271,93.3735-2.28537,26.44494-3.8716,34.69043-10.44739,34.28048-12.48603-.77841-7.43247-31.15875-7.43247-31.15875Z"/></svg>`,
  compliance: `<svg viewBox="0 0 340.80839 333.29516" width="14" height="14" fill="currentColor"><path d="M138.63146,303.53119c-61.45738-14.74208-107.13543-70.05157-107.13543-136.02975,0-77.25593,62.62831-139.88424,139.88424-139.88424s139.88424,62.62831,139.88424,139.88424c0,63.30033-42.04545,116.78042-99.73233,134.03627" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="45.30642"/><path d="M150.72207,236.62484l-50.86605-48.65398c-5.53695-5.29616-7.84814-13.24843-5.66222-20.59206,5.5151-18.52812,26.2255-22.43538,37.9755-11.19491l20.93424,20.0243c1.70896,1.63468,4.41078,1.60466,6.08301-.06757l49.18392-49.18427c11.49931-11.49804,32.27945-8.05227,38.21577,10.33788,2.35439,7.29368.2207,15.29908-5.19872,20.71856l-78.47577,78.47657c-3.35094,3.35097-8.76507,3.41115-12.18966.13549Z"/></svg>`
}

const hoveredRelationship = ref<string | null>(null)
const hoveredCardIndex = ref<number | null>(null)
const hoverRelatesHeader = ref<boolean>(false)

const scrollToRelatedCard = (rel: string) => {
  const card = props.cards.find(c => c.classname === rel)
  if (!card) return

  const id = card.title.toLowerCase().replace(/\s+/g, '-')
  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })

  setTimeout(() => {
    window.scrollBy({ top: -100, behavior: 'smooth' })
  }, 250)

  window.location.hash = '#' + id
}


//Dropdown

const selectedTags = ref<string[]>([])
const filterDropdownOpen = ref(false)
 
const availableTags = computed(() => Object.keys(tagColorMap))
 
const filteredCards = computed(() => {
if (selectedTags.value.length === 0) {
return props.cards
}
 
return props.cards.filter(card =>
card.tags?.some(tag => selectedTags.value.includes(tag))
)
})

</script>

<template>
  <div class="dynamic-card-list">

<div
class="dynamic-card-filter"
@mouseenter="filterDropdownOpen = true"
@mouseleave="filterDropdownOpen = false"
>
<button type="button" class="dynamic-card-filter__trigger">
Filter Tags
<span v-if="selectedTags.length">
({{ selectedTags.length }})
</span>
</button>
 
<div
v-if="filterDropdownOpen"
class="dynamic-card-filter__dropdown"
>
<button
v-for="tag in availableTags"
:key="tag"
type="button"
class="dynamic-card-filter__option"
:style="{
color: tagColorMap[tag]
}"
@click="
selectedTags.includes(tag)
? selectedTags = selectedTags.filter(t => t !== tag)
: selectedTags = [...selectedTags, tag]
"
>
<span
class="dynamic-card-filter__tag-icon"
v-html="iconMap[tag]"
></span>
 
{{ tag }}
 
<span
v-if="selectedTags.includes(tag)"
class="dynamic-card-filter__check"
>
✓
</span>
</button>
 
<button
v-if="selectedTags.length"
class="dynamic-card-filter__clear"
@click="selectedTags = []"
>
Clear filters
</button>
</div>
</div>

    <div
      v-for="(card, index) in filteredCards"
      :key="card.title"
      class="dynamic-card"
      :id="card.title.toLowerCase().replace(/\s+/g, '-')"
      @mouseenter="hoveredCardIndex = index"
      @mouseleave="hoveredCardIndex = null"
      :style="{
        backgroundColor: card.backgroundColor || '#ffffff',
        opacity:
          hoveredRelationship || hoverRelatesHeader
            ? (
                hoveredCardIndex === index ||
                card.classname === hoveredRelationship ||
                (hoverRelatesHeader &&
                  props.cards[hoveredCardIndex]?.relationships?.includes(card.classname))
              )
              ? 1
              : 0.35
            : 1
      }"
    >
      <div
        class="dynamic-card__header"
        :style="{ backgroundColor: card.headingBackgroundColor || 'pink' }"
      >
        <img
          v-if="card.logo"
          :src="card.logo"
          class="dynamic-card__main-logo"
          alt="project logo"
        />
        <a
          class="dynamic-card__title"
          :href="'#' + card.title.toLowerCase().replace(/\s+/g, '-')"
          :style="{ color: card.headingColor || '#0f6bff' }"
        >
          {{ card.title }}
        </a>
      </div>

      <div v-if="card.tags?.length" class="dynamic-card__tags">
        <span
          v-for="tag in card.tags"
          :key="tag"
          class="dynamic-card__tag"
          :style="{
            border: '1px solid ' + tagColorMap[tag],
            color: tagColorMap[tag],
            backgroundColor: tagColorMap[tag] + '10'
          }"
        >
          <span class="dynamic-card__tag-icon" v-html="iconMap[tag]"></span>
          {{ tag }}
        </span>
      </div>

      <p class="dynamic-card__details">
        {{ card.details }}
      </p>

      <div class="dynamic-card__separator-horizontal"></div>

      <div class="dynamic-card__links">
        <div class="dynamic-card__link-item" v-if="card.link">
          <img class="dynamic-card__icon" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-globe'><circle cx='12' cy='12' r='10'/><path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20'/><path d='M2 12h20'/></svg>" />
          <a :href="card.link" target="_blank">Website</a>
        </div>

        <div
          v-if="card.link && card.githubLink"
          class="dynamic-card__separator-vertical"
        ></div>

        <div class="dynamic-card__link-item" v-if="card.githubLink">
          <img class="dynamic-card__icon" src="https://simpleicons.org/icons/github.svg" />
          <a :href="card.githubLink" target="_blank">GitHub</a>
        </div>
      </div>

      <div class="dynamic-card__separator-horizontal"></div>

      <div v-if="card.relationships?.length" class="dynamic-card__relates">
        <div
          class="dynamic-card__relates-title"
          @mouseenter="hoverRelatesHeader = true; hoveredCardIndex = index"
          @mouseleave="hoverRelatesHeader = false"
        >
          Relates to
        </div>

        <div class="dynamic-card__relates-logos">
          <img
            v-for="rel in card.relationships"
            :key="rel"
            :src="props.relationships_logos[rel]"
            class="dynamic-card__rel-logo"
            alt="relationship logo"
            @mouseenter="hoveredRelationship = rel; hoveredCardIndex = index"
            @mouseleave="hoveredRelationship = null"
            @click="scrollToRelatedCard(rel)"
          />
        </div>
      </div>
    </div>

    <div class="dynamic-card-list__spacer"></div>
  </div>
</template>

<style scoped>
.dynamic-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.dynamic-card-list__spacer {
  width: 100%;
  height: 2rem;
}

.dynamic-card {
  width: 345px;
  aspect-ratio: 2 / 3;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  border: 1px solid #e5e8ef;
  padding: 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: opacity 0.2s ease;
}

.dynamic-card__header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
}

.dynamic-card__main-logo {
  width: 56px;
  height: 56px;
}

.dynamic-card__title {
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
}

.dynamic-card__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
}

.dynamic-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: bold;
  line-height: 1.1;
}

.dynamic-card__tag-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dynamic-card__details {
  font-size: 1rem;
  line-height: 1.75;
  color: black;
  margin-bottom: 1rem;
}

.dynamic-card__separator-horizontal {
  width: 100%;
  height: 1px;
  background-color: #d0d0d0;
  margin: 0.8rem 0 1rem 0;
}

.dynamic-card__links {
  display: flex;
  gap: 1rem;
  align-items: center;
  /* removed margin-bottom so both separators have same visual gap */
}

.dynamic-card__link-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dynamic-card__icon {
  width: 18px;
  height: 18px;
}

.dynamic-card__links a {
  color: #0f6bff;
  font-weight: 600;
  text-decoration: none;
}

.dynamic-card__separator-vertical {
  width: 1px;
  height: 18px;
  background-color: #d0d0d0;
}

.dynamic-card__relates {
  margin-top: auto;
}

.dynamic-card__relates-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.dynamic-card__relates-logos {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.dynamic-card__rel-logo {
  width: 32px;
  height: 32px;
  cursor: pointer;
}




.dynamic-card-filter {
position: relative;
width: 100%;
margin-bottom: 1rem;
}
 
.dynamic-card-filter__trigger {
padding: 0.6rem 1rem;
border: 1px solid #d0d0d0;
border-radius: 8px;
background: white;
cursor: pointer;
font-weight: 600;
}
 
.dynamic-card-filter__dropdown {
position: absolute;
top: calc(100% + 6px);
left: 0;
z-index: 100;
min-width: 280px;
background: white;
border: 1px solid #d0d0d0;
border-radius: 10px;
box-shadow: 0 8px 24px rgba(0,0,0,0.12);
padding: 0.5rem;
}
 
.dynamic-card-filter__option {
width: 100%;
display: flex;
align-items: center;
gap: 0.6rem;
padding: 0.55rem 0.75rem;
background: transparent;
border: none;
cursor: pointer;
text-align: left;
font-size: 0.85rem;
font-weight: 600;
border-radius: 6px;
}
 
.dynamic-card-filter__option:hover {
background: rgba(0,0,0,0.05);
}
 
.dynamic-card-filter__tag-icon {
display: flex;
align-items: center;
justify-content: center;
}
 
.dynamic-card-filter__tag-icon :deep(svg) {
width: 14px;
height: 14px;
}
 
.dynamic-card-filter__check {
margin-left: auto;
font-weight: 700;
}
 
.dynamic-card-filter__clear {
width: 100%;
margin-top: 0.4rem;
padding: 0.55rem;
border: none;
border-top: 1px solid #e5e5e5;
background: transparent;
cursor: pointer;
font-weight: 600;
}

</style>
