---
title: "OCM v2: A Fresh Foundation for Secure Software Delivery"
date: "2026-08-03"
banner: "assets/blog/20260803_ocm_v2_release_banner.svg"
authors:
    - "open-component-model-team"
tags:
    - "2026"
    - "news"
    - "projects"
    - "ocm"

published: true
---

# OCM v2: A Fresh Foundation for Secure Software Delivery

The [Open Component Model (OCM)](https://ocm.software/) project, part of NeoNephos, has released **OCM v2**: a ground-up rebuild of its tooling stack, a new CLI, Kubernetes controllers, and Go bindings, all designed from the start for modularity, security, and community contribution. The full announcement is on the [OCM blog](https://ocm.software/blog/ocmv2/); this is the short version for the NeoNephos community.

## What changed

The original OCM libraries served the project well, but a monolithic architecture pulled in more than most users needed, was hard for new contributors to navigate, and made every change risk regressions elsewhere. OCM v2 answers that with a modular design, decoupled APIs, and a smaller dependency footprint. All three components, the CLI, the Kubernetes controllers, and the Go bindings, now live in a [single monorepo](https://github.com/open-component-model/open-component-model), sharing one dependency tree and release cycle.

The full **Pack, Sign, Transport, Deploy** workflow is covered end to end: bundle software into component versions, sign them for provenance, move them between registries or across air gaps, and deploy them to Kubernetes via GitOps-native controllers. Every version created with v2 still implements the [OCM Specification v2](https://github.com/open-component-model/ocm-spec), so it stays fully interoperable with the existing stack.

A significant step forward is **native OCI compatibility**: component versions are now stored as standard OCI Image Indices, so a Helm chart or container image packaged in an OCM component can be pulled directly with `helm pull` or `docker pull`, no OCM-specific tooling in the path.

## A community reboot within NeoNephos

OCM v2 is not only a technical reboot. Since OCM joined NeoNephos, the project has established open governance: the **OCM Technical Steering Committee** sets the strategic direction, and a dedicated **SIG Spec** for the specification itself is in preparation.

## SIG Runtime

The runtime has a dedicated home: **[SIG Runtime](https://github.com/open-component-model/open-component-model/blob/main/docs/community/SIGs/Runtime/SIG-Runtime-CHARTER.md)**, the special interest group that maintains and shapes the OCM runtime: the Go bindings, the CLI, and the Kubernetes controllers. Its goal is to keep OCM components creatable, signable, transportable, verifiable, and deployable. Technical decisions are tracked openly through [ADRs](https://github.com/open-component-model/open-component-model/tree/main/docs/adr), and the SIG reports to the OCM Technical Steering Committee.

## Get involved

- Read the [full announcement](https://ocm.software/blog/ocmv2/) and the [documentation](https://ocm.software/docs/)
- Browse and contribute on [GitHub](https://github.com/open-component-model/open-component-model)
- Join the conversation on Zulip: [neonephos-ocm-support](https://linuxfoundation.zulipchat.com/#narrow/channel/532975-neonephos-ocm-support)

We are looking forward to building the future of sovereign cloud delivery together.
