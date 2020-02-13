# Changelog

<a name="1.0.0"></a>
## 1.0.0 (2020-02-13)

### Added

- ✨ Adding loadAJob() fn [[1127b35](https://github.com/Abourass/simpleIdle/commit/1127b35a537faf1e66192cfa98d6bf9aa12c9bb1)]
- ✨ Adding Player.load() fn [[2b84ccb](https://github.com/Abourass/simpleIdle/commit/2b84ccb80a2e174a7ed51d0f8428eab881990a0f)]
- ✨ Adding Player.load() fn [[18229fc](https://github.com/Abourass/simpleIdle/commit/18229fc0f901d36b608b58c62e9e0cced6e6b8b4)]
- ✨ beta save function [[8411e3c](https://github.com/Abourass/simpleIdle/commit/8411e3c642ebd7065420147479ee948a757bfa75)]
- ✨ Add fourth job level [[1f221ae](https://github.com/Abourass/simpleIdle/commit/1f221ae20c6ac0312bca5a1dc052b77abc4f680f)]
- ✨ Calculate item bonus [[86b38c1](https://github.com/Abourass/simpleIdle/commit/86b38c1526f28b016c0844ce080a8e3655f765d1)]
- ✨ Adding a shop [[83cce14](https://github.com/Abourass/simpleIdle/commit/83cce148c5131082e8f4316608ebaa3f8ebef172)]
- ✨ Creating item class [[ded9656](https://github.com/Abourass/simpleIdle/commit/ded9656ec31834d92962aecf394bd94ef3783c4c)]
- ✨ Jobs now have exp [[8710652](https://github.com/Abourass/simpleIdle/commit/8710652643e7d3c83119993f8207064ee714f766)]
- ✨ You can choose a job now [[e7c07f3](https://github.com/Abourass/simpleIdle/commit/e7c07f3127f4e7f63e1a8d283341cb227cbd8445)]
- ✨ implemented karma, and choose a job eventHandlers [[9e1f068](https://github.com/Abourass/simpleIdle/commit/9e1f0681fc10dc4f168031643d38e62ad4f09329)]
- ✨ Added new job (shoplifter) [[7028e90](https://github.com/Abourass/simpleIdle/commit/7028e90346c74f9ef04d9a17b339c340265209b6)]
- ✨ Added choose a job action [[da8921c](https://github.com/Abourass/simpleIdle/commit/da8921cb220f9d38f6ae23cc9073f26af246f271)]
- 🎉 Make it so number two [[875ce91](https://github.com/Abourass/simpleIdle/commit/875ce916eab37a0503efa8ff736a2d65dc2cfe94)]
- 🎉 Make it so number one [[2fe082d](https://github.com/Abourass/simpleIdle/commit/2fe082dfb45ab78e1bdbcb6c197c789957a6e325)]

### Changed

- 🎨 Making UI more cohesive [[5c31aec](https://github.com/Abourass/simpleIdle/commit/5c31aec2afae1ddacdb89931538fc509dfbd88e7)]
- 🎨 Making UI more cohesive [[f96ed9b](https://github.com/Abourass/simpleIdle/commit/f96ed9be29db277a2975a5c71108d3fc272e3c13)]
- 🎨 CHanging job into a level el [[4c5fa8f](https://github.com/Abourass/simpleIdle/commit/4c5fa8f798c06a21d4c1b996125c2aaa07d23970)]
- 🎨 Updating UI so you can see your jobLvl / jobExp [[398c073](https://github.com/Abourass/simpleIdle/commit/398c0736bcb8d81fc6bdd56233d327f1137aa0c5)]
- 🎨 Reduced job fn&#x27;s into single file, nested job under player for easier access [[4f54fea](https://github.com/Abourass/simpleIdle/commit/4f54fea8515268fb2f9a7f187a7ef43ae7f506ff)]

### Fixed

- 🐛 adding failsafe for bad loads [[59112b7](https://github.com/Abourass/simpleIdle/commit/59112b7cced00746187354d8b0ba9b44757d7459)]
- 🐛 fix addJobExp on tick fn [[06a8f8a](https://github.com/Abourass/simpleIdle/commit/06a8f8a711440c12df547211d283e86bdff0fa3d)]
- 🐛 Fixed issue with passing the correct info to nextTick [[854a7c5](https://github.com/Abourass/simpleIdle/commit/854a7c5afd8dd9090a17a177809b6f08119a7f47)]
- 🐛 Fixed bug where if you passed the level requirement the item disappears [[4f2b188](https://github.com/Abourass/simpleIdle/commit/4f2b188e9005e5c1c8ecbf73f670901b2cbf372a)]
- 🐛 Was trying to call requirements not requirement [[47382bf](https://github.com/Abourass/simpleIdle/commit/47382bf4b174573d89f3be58497dc324daea7f7a)]
- 🐛 Moving showItems to click actions [[da3a640](https://github.com/Abourass/simpleIdle/commit/da3a64024e151bb88202c1a8037385180b51b266)]
- 🐛 Fixing broken .js link [[44fd9cf](https://github.com/Abourass/simpleIdle/commit/44fd9cf0f46ea5d6ab2bfa2d74b989bf3243966d)]
- 🐛 Fix incorrect link to shop module [[a16637c](https://github.com/Abourass/simpleIdle/commit/a16637c2a0e602123a1bfd2706ae70c5a1688a5e)]
- 🐛 Fixing ui bug where I forgot to add .title [[6db18f5](https://github.com/Abourass/simpleIdle/commit/6db18f54528f64d84be73b2f937fab772c045937)]
- 🐛 Fixing incorrect use of setter [[1b87fea](https://github.com/Abourass/simpleIdle/commit/1b87fea27c29e13ba73ce80b0cda992e36bd17bb)]
- 🐛 fixed listOfJobs not being called correctly from Actions.js [[4c9ab5c](https://github.com/Abourass/simpleIdle/commit/4c9ab5ccfe0d7ab1fb33576f4a4c2946a3c86dcf)]
- 🐛 Fixing missing export statement [[ac36077](https://github.com/Abourass/simpleIdle/commit/ac3607744dbe0d53e0edf38c883c9cd55329dfe1)]
- 🐛 Fixed issue with url path *hopefully* [[6c49315](https://github.com/Abourass/simpleIdle/commit/6c49315d6563852cfc8ee8050e9eee372d3c7ecb)]
- 🐛 Fixed issue with url path *hopefully* [[255e299](https://github.com/Abourass/simpleIdle/commit/255e299290796ac94bf78d43d5d92958b46e28fb)]
- 🐛 Fixed issue with url path *hopefully* [[c40b760](https://github.com/Abourass/simpleIdle/commit/c40b760d74be0cb63365d371a1bd2386d6c96d39)]

### Miscellaneous

-  updating CHANGELOG.md [[fba1c7e](https://github.com/Abourass/simpleIdle/commit/fba1c7e862015a3d31cbdae59c1e34ea30b56683)]
-  debugging potential methods for showItems [[2b00d64](https://github.com/Abourass/simpleIdle/commit/2b00d64c16eeea23e0201af2c04b54b9256df68e)]
-  updating CHANGELOG.md [[bbad3f6](https://github.com/Abourass/simpleIdle/commit/bbad3f6bb3c833c9bbc6e2f47fc35fdf97952238)]
-  updating CHANGELOG.md [[4e5dbdd](https://github.com/Abourass/simpleIdle/commit/4e5dbdd04a1de85101fa62f4e2d4d38a89e9c61f)]
-  updating CHANGELOG.md [[007e255](https://github.com/Abourass/simpleIdle/commit/007e255f5400c65454916d0488d6c490ff5cdb4b)]
-  debugging loadJob [[918ee1f](https://github.com/Abourass/simpleIdle/commit/918ee1f3b63dc9115575909ed622dee93943bf07)]
-  debugging loadJob [[6b4d6e9](https://github.com/Abourass/simpleIdle/commit/6b4d6e99cec009ead98d6c0c7adfc641f99a7848)]
-  debugging loadJob [[2b4104c](https://github.com/Abourass/simpleIdle/commit/2b4104ce32391179284d95d9c0ae32097d569c72)]
-  debugging loadJob [[c925ac1](https://github.com/Abourass/simpleIdle/commit/c925ac18110be0929ef37b4ceb92c777fad591e3)]
-  debugging loadJob [[fe31529](https://github.com/Abourass/simpleIdle/commit/fe315298ca6e361fa37e2d13a0f999fb0da65848)]
-  updating CHANGELOG.md [[0f44f12](https://github.com/Abourass/simpleIdle/commit/0f44f12bcfafe5e37b76bac4d25747d0ea3aefc6)]
-  updating changelog.md [[7731cf8](https://github.com/Abourass/simpleIdle/commit/7731cf892c38b6f502329958717dc0ba0f947455)]
-  updating changelog.md [[9c2a97e](https://github.com/Abourass/simpleIdle/commit/9c2a97e709cb4a8c418a93e7719da2c644fd9bb1)]
-  Added more jobs [[ef9c08b](https://github.com/Abourass/simpleIdle/commit/ef9c08b77095afaf0ea3e8c01f21bce890dbe6f4)]
-  Adding Bank Teller [[3637eab](https://github.com/Abourass/simpleIdle/commit/3637eab8fedd0d017dfe2a0d8e9425fc6575d939)]


