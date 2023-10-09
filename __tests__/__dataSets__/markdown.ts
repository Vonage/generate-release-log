export default [
  {
    label: 'standard markdown',
    pkgName: 'My SDK',
    markdown: `## Vonage My SDK v1.0.0 (1997-08-29)

### Changed
* Planks constant to a lower value

### Deprecated
* Call to kernal 

### Fixes 
* Ctrl Key no longer overheats CPU

### Removed
* The need for speed

### Added
* New feature to reticulate splines

### Security
* Key Card now requrired for entry


`,
    expected: `## Vonage My SDK v1.0.0 (1997-08-29)

### Added

* New feature to reticulate splines

### Fixed

* Ctrl Key no longer overheats CPU

### Security

* Key Card now requrired for entry

### Removed

* The need for speed

### Changed

* Planks constant to a lower value

### Deprecated

* Call to kernal`,
    expectedReleaseDate: "1997-08-29",
    expectedVersion: "1.0.0"
  },
];
