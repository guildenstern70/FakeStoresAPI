#!/usr/bin/env bash
ibmcloud login --apikey G2hhAxJqU2f0mtMK7W7_LmX3ki2m4a-Gxtm4h3a-vAPf
ibmcloud target -o 'alessiosaltarin@it.ibm.com' -r eu-de -s dev
ibmcloud cf push
